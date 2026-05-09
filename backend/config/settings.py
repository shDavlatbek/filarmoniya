"""Django settings for the Filarmoniya backend."""

from pathlib import Path

from decouple import Csv, config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config(
    'DJANGO_SECRET_KEY',
    default='django-insecure-change-me-in-production-zv=9vc4mihi0gd',
)
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config(
    'ALLOWED_HOSTS',
    default='localhost,127.0.0.1,0.0.0.0',
    cast=Csv(),
)

INSTALLED_APPS = [
    # Jazzmin must come before django.contrib.admin
    'jazzmin',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'django_filters',
    'corsheaders',
    'drf_spectacular',
    'django_ckeditor_5',
    'mptt',

    # Local apps
    'apps.core',
    'apps.news',
    'apps.events',
    'apps.teams',
    'apps.people',
    'apps.pages',
    'apps.documents',
    'apps.media_app',
    'apps.international',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': config('SQLITE_PATH', default=str(BASE_DIR / 'db.sqlite3')),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'uz'
TIME_ZONE = 'Asia/Tashkent'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# DRF
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 24,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'Filarmoniya API',
    'DESCRIPTION': "O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi public API",
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

# CORS — allow Next.js dev origin
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://127.0.0.1:3000',
    cast=Csv(),
)
CORS_ALLOW_CREDENTIALS = True

# CKEditor 5
CKEDITOR_5_FILE_UPLOAD_PERMISSION = 'staff'
CKEDITOR_5_UPLOAD_FILE_VIEW_NAME = 'ck_editor_5_upload_file'
CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': [
            'heading', '|',
            'bold', 'italic', 'link', 'underline', 'strikethrough', '|',
            'bulletedList', 'numberedList', 'blockQuote', '|',
            'imageUpload', 'mediaEmbed', 'insertTable', '|',
            'undo', 'redo',
        ],
    },
    'extends': {
        'blockToolbar': [
            'paragraph', 'heading1', 'heading2', 'heading3',
            '|', 'bulletedList', 'numberedList',
            '|', 'blockQuote',
        ],
        'toolbar': [
            'heading', '|',
            'outdent', 'indent', '|',
            'bold', 'italic', 'link', 'underline', 'strikethrough',
            'subscript', 'superscript', 'highlight', '|',
            'codeBlock', 'sourceEditing', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'blockQuote', 'imageUpload', 'mediaEmbed', '|',
            'insertTable', 'horizontalLine', '|',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
            'alignment', '|',
            'undo', 'redo',
        ],
        'image': {
            'toolbar': [
                'imageTextAlternative', 'imageCaption',
                'imageStyle:alignLeft', 'imageStyle:alignRight', 'imageStyle:alignCenter',
                'imageStyle:full', 'imageStyle:side',
            ],
            'styles': ['full', 'side', 'alignLeft', 'alignRight', 'alignCenter'],
        },
        'table': {
            'contentToolbar': [
                'tableColumn', 'tableRow', 'mergeTableCells',
                'tableProperties', 'tableCellProperties',
            ],
        },
    },
}

# Jazzmin admin theme
JAZZMIN_SETTINGS = {
    'site_title': 'Filarmoniya Admin',
    'site_header': 'Filarmoniya',
    'site_brand': "O'zbekiston Davlat Filarmoniyasi",
    'welcome_sign': "Filarmoniya boshqaruv panelig'a xush kelibsiz",
    'copyright': "O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
    'search_model': ['news.NewsArticle', 'events.Event', 'people.Person'],
    # 'topmenu_links': [
    #     {'name': 'Bosh sahifa', 'url': 'admin:index', 'permissions': ['auth.view_user']},
    #     {'name': 'Sayt', 'url': 'http://localhost:3000', 'new_window': True},
    #     {'name': 'API hujjat', 'url': '/api/schema/swagger/', 'new_window': True},
    # ],
    'icons': {
        'auth': 'fas fa-users-cog',
        'auth.user': 'fas fa-user',
        'auth.Group': 'fas fa-users',
        'core.SiteSettings': 'fas fa-cog',
        'core.HeroSlide': 'fas fa-images',
        'core.Partner': 'fas fa-handshake',
        'core.NavigationItem': 'fas fa-bars',
        'core.ContactInfo': 'fas fa-address-card',
        'core.ContactSubject': 'fas fa-envelope-open-text',
        'core.ContactMessage': 'fas fa-inbox',
        'news.NewsArticle': 'fas fa-newspaper',
        'events.Event': 'far fa-calendar-alt',
        'events.EventCategory': 'fas fa-tags',
        'teams.Team': 'fas fa-people-group',
        'people.Person': 'fas fa-user-tie',
        'people.Department': 'fas fa-sitemap',
        'pages.AboutPage': 'fas fa-info-circle',
        'pages.AboutMilestone': 'fas fa-monument',
        'pages.AboutStat': 'fas fa-chart-bar',
        'pages.ChapteredDocument': 'fas fa-book',
        'documents.Document': 'fas fa-file-alt',
        'documents.OpenDataItem': 'fas fa-database',
        'documents.PressRelease': 'fas fa-bullhorn',
        'media_app.Video': 'fab fa-youtube',
        'media_app.VideoCategory': 'fas fa-folder',
        'international.Memorandum': 'fas fa-file-signature',
        'international.IntlConcert': 'fas fa-globe',
        'international.Competition': 'fas fa-trophy',
    },
    'related_modal_active': True,
    'show_ui_builder': False,
    'changeform_format': 'horizontal_tabs',
    'changeform_format_overrides': {
        'auth.user': 'collapsible',
        'auth.group': 'vertical_tabs',
    },
    'language_chooser': False,
}

JAZZMIN_UI_TWEAKS = {
    'navbar_small_text': False,
    'footer_small_text': False,
    'body_small_text': False,
    'brand_small_text': False,
    'brand_colour': 'navbar-dark',
    'accent': 'accent-primary',
    'navbar': 'navbar-dark navbar-primary',
    'no_navbar_border': False,
    'navbar_fixed': True,
    'layout_boxed': False,
    'footer_fixed': False,
    'sidebar_fixed': True,
    'sidebar': 'sidebar-dark-primary',
    'sidebar_nav_small_text': False,
    'sidebar_disable_expand': False,
    'sidebar_nav_child_indent': True,
    'sidebar_nav_compact_style': False,
    'sidebar_nav_legacy_style': False,
    'sidebar_nav_flat_style': False,
    'theme': 'flatly',
    # 'dark_mode_theme': 'darkly',
    'button_classes': {
        'primary': 'btn-primary',
        'secondary': 'btn-secondary',
        'info': 'btn-info',
        'warning': 'btn-warning',
        'danger': 'btn-danger',
        'success': 'btn-success',
    },
    'actions_sticky_top': True,
}
