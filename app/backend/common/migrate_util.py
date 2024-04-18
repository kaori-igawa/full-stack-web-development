import os

from django.conf import settings
from django.core.management import call_command

def common_load_fixture(migration_filename):

  setting_file = settings.SETTINGS_MODULE

  target = os.path.splitext(migration_filename)[0].replace('migrations', 'fixtures')
  base_yaml_name = target + '/base.yaml'

  call_command('loaddata', '--settings', setting_file, '--format=yaml', base_yaml_name)