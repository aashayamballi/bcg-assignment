# Generated by Django 3.2.5 on 2021-11-20 12:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('policy', '0002_alter_policydetail_customer_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='policydetail',
            old_name='premimum',
            new_name='premium',
        ),
    ]