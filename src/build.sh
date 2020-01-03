#! /bin/bash

# 清除文件夹
rm -rf _assets

# 重新创建文件夹
mkdir -p _assets/website/
mkdir -p _assets/ebook/

# 编译JS
browserify src/js/core/index.js | uglifyjs -mc > _assets/website/gbook.js
browserify src/js/theme/index.js | uglifyjs -mc > _assets/website/theme.js

# 编译 Website CSS
lessc -clean-css src/less/website.less _assets/website/style.css

# 编译 eBook CSS
lessc -clean-css src/less/ebook.less _assets/ebook/ebook.css
lessc -clean-css src/less/pdf.less _assets/ebook/pdf.css
lessc -clean-css src/less/mobi.less _assets/ebook/mobi.css
lessc -clean-css src/less/epub.less _assets/ebook/epub.css

# 拷贝 fonts
mkdir -p _assets/website/fonts
cp -R node_modules/font-awesome/fonts/ _assets/website/fonts/fontawesome/

# 拷贝 icons
mkdir -p _assets/website/images
cp node_modules/gbook-logos/output/favicon.ico _assets/website/images/
cp node_modules/gbook-logos/output/apple-touch-icon-152.png _assets/website/images/apple-touch-icon-precomposed-152.png