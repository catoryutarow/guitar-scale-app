# Python 3.11 + ffmpeg
FROM python:3.11-slim

# ffmpeg + オーディオ処理ライブラリをインストール
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

# \mǣ���-�
WORKDIR /app

# requirements.txt ����Wf�X������
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ��������ɒ���
COPY . .

# ������ա���X(ǣ���\
RUN mkdir -p /app/uploads

# ��� 8000 �l�
EXPOSE 8000

# uvicorn g���w�
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
