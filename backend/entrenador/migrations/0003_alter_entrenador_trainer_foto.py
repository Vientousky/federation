# Generated by Django 5.2 on 2025-05-30 17:56

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('entrenador', '0002_alter_entrenador_cargo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entrenador',
            name='trainer_foto',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True),
        ),
    ]
