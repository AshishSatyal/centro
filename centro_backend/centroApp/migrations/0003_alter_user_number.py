# Generated by Django 5.0.6 on 2024-07-20 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('centroApp', '0002_user_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='number',
            field=models.IntegerField(default=9800000000),
            preserve_default=False,
        ),
    ]
