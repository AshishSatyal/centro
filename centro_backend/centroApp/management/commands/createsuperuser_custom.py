from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils.translation import gettext as _

class Command(BaseCommand):
    help = _('Creates a superuser.')

    def add_arguments(self, parser):
        parser.add_argument('--email', dest='email', required=False, help=_('Email address'))

    def handle(self, *args, **options):
        User = get_user_model()
        email = options.get('email', '')
        if not email:
            self.stderr.write(_('%(program)s requires the --email option' % {'program': self.style.ERROR}))
            return

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = User.objects.create_superuser(email=email, name='', password='')
            print(f'Successfully created superuser {user.email}')

        else:
            print(f'Superuser {user.email} already exists.')
