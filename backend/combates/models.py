from django.db import models
from boxeador.models import Boxeador

# Create your models here.

class Combates(models.Model):
    boxeador = models.ForeignKey(Boxeador, related_name='combates_principal', on_delete=models.CASCADE)
    rival = models.ForeignKey(Boxeador, related_name='combate_rival', on_delete=models.CASCADE)

    fecha = models.DateTimeField()
    peso = models.FloatField()
    lugar = models.CharField (max_length=200)
    resultados = models.CharField(
    max_length=6,
    choices=[
        ("Victorias", [
            ("KOS", "Victoria por nocaut"),
            ("TKO", "Victoria por nocaut técnico"),
            ("RSC", "Parada del árbitro (amateur)"),
            ("UD", "Decisión unánime"),
            ("PTS", "Decisión por puntos"),
            ("IDT", "Gana por retiro"),
            ("TDU", "Decisión técnica unánime"),
            ("TDM", "Decisión técnica por mayoría"),
        ]),
        ("Derrotas", [
            ("DQ", "Descalificación"),
            ("DDQ", "Doble descalificación"),
            ("RET", "Retiro (aficionado)"),
            ("TDS", "Decisión técnica dividida"),
            ("AB", "Renuncia en esquina (amateur)"),
        ]),
        ("Empates", [
            ("MD", "Decisión mayoritaria"),
            ("SD", "Decisión dividida"),
            ("TDD", "Empate técnico"),
        ]),
        ("SinDec", [
            ("NC", "Sin concurso"),
            ("ND", "Sin decisión"),
            ("BYE", "Bye de ronda (amateur)"),
            ("WO", "Walk Over (amateur)"),
        ]),
        ("Otros", [
            ("VS", "Versus / pelea programada"),
        ]),])
    rounds = models.CharField

    def clasificar_resultado(self):
        codigo = self.resultados
        if codigo in ['KOS', 'TKO', 'RSC', 'UD', 'PTS', 'IDT', 'TDU', 'TDM']:
            return 'Victoria'
        elif codigo in ['DQ', 'DDQ', 'RET', 'TDS', 'AB']:
            return 'Derrota'
        elif codigo in ['MD', 'SD', 'TDD']:
            return 'Empate'
        elif codigo in ['NC', 'ND', 'BYE', 'WO']:
            return 'Sin decisión'
        elif codigo == 'VS':
            return 'Programada'
        return 'Desconocido'
    
    def __str__(self):
        return f"{self.boxeador} vs {self.rival} - {self.resultado}"
    
    def historial(self):
        combates = self.combates_principal.order_by('fecha')
        w, l, d, ns = 0, 0, 0, 0
        for c in combates:
            resultado = c.clasificar_resultado()
            if resultado == 'Victoria':
                w += 1
            elif resultado == 'Derrota':
                l += 1
            elif resultado == 'Empate':
                d += 1
            elif resultado == 'Sin decisión':
                ns += 1
        return f"{w} {l} {d} ({ns} NS)"
    
    def ultimas_6(self):
        combates = self.combates_principal.order_py("-fech")[:6]
        simbolos = []
        for c in combates:
            r = c.clasificar_resultado()
            if r == 'Victoria':
                simbolos.append('V')
            elif r == 'Derrota':
                simbolos.append('L')
            elif r == 'Empate':
                simbolos.append('D')
            else:
                simbolos.append('NS')            
        return ''.join(simbolos)        