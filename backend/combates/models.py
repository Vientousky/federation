from django.db import models
from boxeador.models import Boxeador

class Combates(models.Model):
    boxeador = models.ForeignKey(Boxeador, related_name='combates_principal', on_delete=models.CASCADE)
    rival = models.ForeignKey(Boxeador, related_name='combate_rival', on_delete=models.CASCADE)
    fecha = models.DateTimeField()
    peso = models.FloatField()
    lugar = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.boxeador} vs {self.rival}"