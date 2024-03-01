# Nxm Better List View © 2023
# Author:  AmeenAhmed & Zat nd Bas
# Company: Nxmpy pvt ltd
# Licence: Please refer to LICENSE file


from nxm import __version__ as nxm_version


app_name = "nxm_better_list_view"
app_title = "Nxm Better List View"
app_publisher = "AmeenAhmed & Zat nd Bas "
app_description = "Nxm list view plugin that allows modification."
app_icon = "octicon octicon-list-unordered"
app_color = "blue"
app_email = "nxmpy.com@gmail.com"
app_license = "MIT"


is_nxm_above_v13 = int(nxm_version.split('.')[0]) > 13
is_nxm_above_v12 = int(nxm_version.split('.')[0]) > 12


app_include_js = [
    'better_list_view.bundle.js'
] if is_nxm_above_v13 else ([
    '/assets/nxm_better_list_view/js/better_list_view.js'
] if is_nxm_above_v12 else [
    '/assets/nxm_better_list_view/js/better_list_view_v12.js'
])