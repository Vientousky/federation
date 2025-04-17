from django.db import models

# Create your models here.

class Boxeador(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    sexo = models.CharField(max_length=10, choices=[
        ('Masculino', 'Masculino'),
        ('Femenino', 'Femenino'),
    ])
    dni = models.CharField(max_length=10, unique=True)
    numero_licencia = models.CharField(max_length=10, unique=True)
    nacionalidad = models.CharField(max_length=50)
    provincia = models.CharField(max_length=50)
    localidad = models.CharField(max_length=150)
    fecha_nacimiento = models.DateField()
    debutaje = models.DateField()
    fecha_ingreso = models.DateField()
    peso = models.FloatField()
    divicion = models.CharField(max_length=50)
    status = models.CharField(max_length=50, choices=[
        ('Activo', 'Activo'),
        ('Inactivo', 'Inactivo'),
        ('Suspendido', 'Suspendido'),
    ], default='Activo')
    combates = models.IntegerField(default=0)
    rounds = models.IntegerField(default=0)
    KOs = models.IntegerField(default=0)
    altura = models.FloatField()
    alcance = models.FloatField()
    stance = models.CharField(max_length=50, choices=[
        ('Ortodoxo', 'Ortodoxo'),
        ('Zurdo', 'Zurdo'),
        ('Switch', 'Switch'),
    ])
    victorias = models.IntegerField(default=0)
    derrotas = models.IntegerField(default=0)
    empates = models.IntegerField(default=0)
    sin_definir = models.IntegerField(default=0)
    foto = models.ImageField(upload_to='boxeadores/fotos/', blank=True, null=True)