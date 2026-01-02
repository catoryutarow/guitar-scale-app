
guitar-scale.com
音名・異名同音・度数表記を正しく扱うための最終実装仕様書
（Claude Code 用）

0. このドキュメントの目的
このドキュメントは、guitar-scale.com において発生している以下の問題を 根本から解決するための実装仕様である。
解決したい問題
* 異名同音（C♯ / D♭ など）が内部で混ざり、度数（ディグリー）の意味が壊れる
* スケールが 5音・6音・8音になると、度数が 1,2,3,4,5… と詰め直されてしまう
* ダブルフラット／ダブルシャープを避けるために、内部で音名を丸めてしまい、理論的に戻れなくなる
* 現在の実装が pitch class（0–11）中心で、音名・理論用途に不向き
本仕様ではこれらを 音楽理論的に正しく、かつプログラミング的に一貫した方法で解決する。

1. 絶対方針（最重要・すべての前提）
1.1 内部表現は「理論的に正しい音名のみ」
* 内部では 異名同音の簡略化を一切しない
* ダブルシャープ、ダブルフラット、トリプルも 仕様として許容
* 親切表記（D♭ → C♯ など）は UI表示レイヤーのみ
厳密 → 親切 は可能親切 → 厳密 は不可能→ 内部は必ず厳密にする

1.2 すべてのスケールは「メジャースケール基準」で定義する
* ナチュラルマイナー、ハーモニックマイナー等もメジャースケールからの変形として扱う
* 「全音・半音の並び」や「セミトーン距離」を直接基準にしない
理由：
* 度数（1–7）の意味を失わない
* keep / replace / add / remove という 単純な操作で一般化できる
* 実装バグが激減する

2. 音名（PitchSpelling）のデータモデル
2.1 PitchSpelling（値オブジェクト）
type PitchSpelling = {
  letter: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  accidental: number // ♭ = -1, 𝄫 = -2, ♯ = +1, 𝄪 = +2 …
  octave?: number     // 任意（指板表示用）
}
2.2 重要なルール
* accidental は 整数で持つ
* E𝄫 は { letter: 'E', accidental: -2 }
* C𝄪𝄪𝄪 は { letter: 'C', accidental: +3 }
* pitch class（0–11）は 派生情報としてのみ計算

3. 度数（ディグリー）の扱い
3.1 度数は常に 1–7 を基準にする
* スケールが 5音でも 8音でも、度数番号は詰めない
* 欠けている度数は欠けたまま
* 同じ度数に複数音がある場合は add された音として扱う
例：
* メジャーペンタトニック：1, 2, 3, 5, 6
* Half–Whole Diminished：3 と ♭3 が両方存在する

4. スケール定義の基本語彙（固定）
すべてのスケールは、以下の 4 操作のみで定義する。
4.1 操作語彙
* keep→ その度数の音を残す
* replace→ その度数の音を 同じ文字名のまま ♭ / ♯ して置換（元は消える）
* add→ その度数に音を追加（元は残る）
* remove→ その度数の音を消す
4.2 超重要ルール
* replace と add を混同しない
* keep は 明示されていない限り存在しない
* replace した音の元音は 必ず消す

5. スケール定義の推奨フォーマット（YAML/JSON）
5.1 例：Half–Whole Diminished
half_whole_diminished:
  base: major
  degrees:
    1: { keep: true }
    2: { replace: b2 }
    3: { keep: true, add: [b3] }
    4: { replace: "#4" }
    5: { keep: true }
    6: { keep: true }
    7: { replace: b7 }
5.2 例：宮古節（都節）
miyakobushi:
  base: major
  degrees:
    1: { keep: true }
    2: { replace: b2 }
    3: { remove: true }
    4: { keep: true }
    5: { keep: true }
    6: { replace: b6 }
    7: { remove: true }

6. スケール生成の絶対手順（破ってはいけない）
Step 1：ルートから「厳密なメジャースケール」を生成
* A〜G の文字名を 順番に必ず1回ずつ使う
* pitch class を見て accidental を決定する
* ここで E♯、B♯、C𝄪 などが出るのは 正常
Step 2：スケール定義（keep/replace/add/remove）を適用
* replace は letter を維持したまま accidental を変える
* 例：D♭メジャーの 2度 E♭ → ♭2 は E𝄫
* D に丸めてはいけない
Step 3：結果は以下の構造で保持
type ScaleTone = {
  degreeLabel: '1' | 'b2' | '2' | '#4' | ...
  spelling: PitchSpelling
  pitchClass: number // 指板・UI用
}

7. 親切表記（Enharmonic Simplification）
7.1 親切表記は「表示専用」
* 内部データを書き換えない
* PitchSpelling → string 変換時のみ適用
7.2 推奨 DisplayStyle
* strict：E𝄫 / C𝄪𝄪𝄪 などをそのまま表示
* friendly：可能な限り単純な異名同音に変換（D など）
* 将来的に：
    * key に応じて ♭/♯ 寄せ
    * 教育モード / 理論モード 切替
7.3 設計指針
* 親切表記は メソッドやフォーマッタ
* 状態として持たない（キャッシュしない）

8. 現在の実装でやってはいけないこと（禁止）
* CHROMATIC_SCALE（12音配列）を音名の基準に使う
* NOTE_TO_PITCH / PITCH_TO_NOTE で内部往復する
* interval 表記（m3, M7）から degree を逆算する
* degree を配列 index + 1 で振る
* 異名同音を内部で丸める

9. 代表的な検証ケース（必ず通す）
9.1 D♭ Half–Whole Diminished
* ♭2 は E𝄫
* D 表記になってはいけない
9.2 C♭ Altered
* D𝄫, E𝄫, F𝄫 … が大量に出るのは 仕様
9.3 E♯ Whole Tone
* トリプルシャープが出ても OK
9.4 都節（5音）
* 度数は 1, b2, 4, 5, b6
* 1,2,3,4,5 に詰めない

10. 推奨リファクタリング戦略（Next.js）
Phase 1（既存コードを壊さない）
* 新規に以下を追加
    * lib/pitchSpelling.ts
    * lib/scaleEngine.ts
* 既存 UI は新エンジンの出力を読むだけ
Phase 2
* semitone / interval ベースの scale 定義を廃止
* degree 操作ベースに統一
Phase 3
* strict / friendly 切替 UI
* 教育モード対応

11. この仕様の目的まとめ
* 音楽理論的に 正しい
* 異名同音・度数が 破綻しない
* 変態スケール・民族音階にも 一般化できる
* プログラミング的に 単純・拡張可能

最後に（Claude Code への指示）
この仕様を前提として
* PitchSpelling モデル
* メジャースケール生成
* degree 操作エンジンを設計・実装してください。親切表記は内部データを書き換えず、表示層でのみ行ってください。


