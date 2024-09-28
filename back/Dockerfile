FROM python:3.12-alpine
LABEL authors="ravshan"
MAINTAINER "Ravshan"
WORKDIR /app
ADD requirements.txt .
RUN pip install -r requirements.txt
ADD . .
EXPOSE 8000
RUN aerich upgrade
CMD ["uvicorn", "main:app", "--host=0.0.0.0"]
