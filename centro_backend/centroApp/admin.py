from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from .models import User,Product,PasswordReset,UserLocation,Comment,Transaction,PremiumMembership,SavedItem

class UserAdmin(BaseUserAdmin):
    # The fields to be used in displaying the User model.
    list_display = ('email', 'firstname', 'lastname', 'number', 'is_staff', 'is_superuser')
    list_filter = ('is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('firstname', 'lastname', 'number')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'firstname', 'lastname', 'number', 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'firstname', 'lastname', 'number')
    ordering = ('email',)
    filter_horizontal = ()

# Now register the new UserAdmin...
admin.site.register(User, UserAdmin)

# Unregister the Group model from admin.
admin.site.unregister(Group)

admin.site.register(Product)

admin.site.register(UserLocation)
admin.site.register(Comment)
admin.site.register(Transaction)
admin.site.register(PremiumMembership)
admin.site.register(SavedItem)
admin.site.register(PasswordReset)
