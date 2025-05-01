from django.db import models

# Create your models here.

class Combates(models.Model):
    fecha = models.DateTimeField()
    peso = models.FloatField()
    nombre = models.CharField(max_length=100)
    lugar = models.CharField (max_length=200)
    resultados
    rounds
    v_l_d
    ultimas_6
