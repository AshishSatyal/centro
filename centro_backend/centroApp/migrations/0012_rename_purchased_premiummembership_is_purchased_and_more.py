# Generated by Django 5.1 on 2024-09-24 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('centroApp', '0011_premiummembership_purchased'),
    ]

    operations = [
        migrations.RenameField(
            model_name='premiummembership',
            old_name='purchased',
            new_name='is_purchased',
        ),
        migrations.AddField(
            model_name='premiummembership',
            name='payment_id',
            field=models.CharField(default=False, max_length=255),
            preserve_default=False,
        ),
    ]
