# Generated by Django 3.2.4 on 2021-11-26 05:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0005_auto_20211126_0945'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image2',
            field=models.ImageField(blank=True, default='', null=True, upload_to='products/'),
        ),
        migrations.AlterField(
            model_name='product',
            name='image3',
            field=models.ImageField(blank=True, default='', null=True, upload_to='products/'),
        ),
    ]
