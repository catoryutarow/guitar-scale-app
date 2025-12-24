# Python 3.11 + ffmpeg ’+€ıÏ¤áü¸
FROM python:3.11-slim

# ffmpeg hÅj·¹Æàé¤Öéê’¤ó¹Èüë
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

# \mÇ£ì¯Èê’-š
WORKDIR /app

# requirements.txt ’³ÔüWfX¢Â’¤ó¹Èüë
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ¢×ê±ü·çó³üÉ’³Ôü
COPY . .

# ¢Ã×íüÉÕ¡¤ëİX(Ç£ì¯Èê’\
RUN mkdir -p /app/uploads

# İüÈ 8000 ’l‹
EXPOSE 8000

# uvicorn g¢×ê’wÕ
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
