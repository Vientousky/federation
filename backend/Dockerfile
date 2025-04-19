FROM python:3.11-slim

ENV VIRTUAL_ENV=/opt/venv
RUN python -m venv $VIRTUAL_ENV \
 && $VIRTUAL_ENV/bin/pip install --upgrade pip

ENV PATH="$VIRTUAL_ENV/bin:$PATH"

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "federation.wsgi:application", "--bind", "0.0.0.0:8000"]
