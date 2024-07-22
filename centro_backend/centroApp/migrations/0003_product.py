# Generated by Django 5.0.6 on 2024-07-20 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('centroApp', '0002_alter_user_managers'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('price', models.FloatField()),
                ('countInStock', models.IntegerField()),
                ('imageUrl', models.CharField(max_length=2083)),
                ('condition', models.CharField(max_length=255)),
                ('sold', models.BooleanField(default=False)),
            ],
        ),
    ]