# Python 3.11 + ffmpeg �+��Ϥ���
FROM python:3.11-slim

# ffmpeg + Essentia依存ライブラリをインストール
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsndfile1 \
    libfftw3-dev \
    libyaml-dev \
    libavcodec-dev \
    libavformat-dev \
    libavutil-dev \
    libswresample-dev \
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
