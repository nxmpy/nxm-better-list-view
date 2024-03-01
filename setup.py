# Nxm Better List View © 2023
# Author:  AmeenAhmed & Zat nd Bas
# Company: Nxmpy pvt ltd
# Licence: Please refer to LICENSE file


from setuptools import setup, find_packages
from nxm_better_list_view import __version__ as version


with open('requirements.txt') as f:
    install_requires = f.read().strip().split('\n')


setup(
    name='nxm_better_list_view',
    version=version,
    description='Nxm list view plugin that allows modification.',
    author='AmeenAhmed & Zat nd Bas ',
    author_email='nxmpy.com@gmail.com',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires
)
