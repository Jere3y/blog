title: Windows 环境下 Django + Apache + mod_wsgi 部署
date: 2020-10-25 17:04:41
tags: uWSGI Django
Category: Django


## 环境准备-安装

### 1. Windows 下 Apache 下载地址

    https://www.apachelounge.com/download/

我们下载最新版本的 Apache，本文完成时最新的文件为： 

    httpd-2.4.46-win64-VS16.zip  

下载完成后，解压缩。

在文件夹 Apache24 -> modules 并没有找到 mod_wsgi 的预置。下一步我们要安装下的 mod_wsgi 。

### 2. 安装 mod_wsgi

    pip install mod-wsgi

> https://pypi.org/project/mod-wsgi/

可能报错提示：

    RuntimeError: No Apache installation can be found. Set the MOD_WSGI_APACHE_ROOTDIR environment to its location

意思是：我们没有在环境变量中设置 MOD_WSGI_APACHE_ROOTDIR ,所以安装程序找不到 Apache 的位置。

~~我们设置环境变量：~~

    变量名：MOD_WSGI_APACHE_ROOTDIR
    变量值：我们解压的 apache 位置

~~设置完成后，我们重新执行安装：~~

    pip install mod-wsgi

~~还是同样的错误。翻看官方文档，给出了解答：~~

> 官方链接：https://modwsgi.readthedocs.io/en/develop/release-notes/version-4.5.12.html

> When using pip install on Windows, in addition to looking in the directory C:\Apache24 for an Apache installation, it will now also check C:\Apache22 and C:\Apache2. It is recommended though that you use Apache 2.4. If your Apache installation is elsewhere, you can still set the MOD_WSGI_APACHE_ROOTDIR environment variable to its location. The environment variable should be set in your shell before running pip install mod_wsgi and should be set in a way that exports it to child processes run from the shell.

简而言之就是，如果解压的地址不是 mod-wsgi 的默认地址，我们要在当前 shell 中设置环境变量，然后再运行 pip 安装。

我们执行：

    # 注意设置到你解压的 apache 文件夹的位置
    set "MOD_WSGI_APACHE_ROOTDIR=F:\Apache24" 
    # 执行安装
    pip install mod-wsgi

终于安装成功了。

### 3. 获取 mod_wsgi 配置

我们在命令行中运行：

    mod_wsgi-express module-config

输出：

    LoadModule wsgi_module "***/venv/lib/site-packages/mod_wsgi/server/mod_wsgi.cp36-win_amd64.pyd"
    WSGIPythonHome "**/venv"

可以看到命令行输出 Apache 的配置参数，我们复制这些内容到 Apache 的配置文件 httpd.conf 中。

配置解释：

LoadModule 表示 Apache 载入 wsgi_module 功能，后面的参数是该 module 的路径。

WSGIPythonHome 表示的是 Python 环境的位置。注意这里只生成了当前环境的位置，如果使用的是 python -m venv 那么需要加上主 python 的安装位置。

### 4. 配置 httpd.conf

如果使用 venv 这里会出现找不到“包”的错误，下面完整的配置以及解释：

    # 表示 Apache 载入 wsgi_module 功能，后面的参数是该 module 的路径，通过 mod_wsgi-express module-config 可以获取到。
    LoadModule wsgi_module "**/venv/lib/site-packages/mod_wsgi/server/mod_wsgi.cp36-win_amd64.pyd"

    # WSGIPythonHome 表示的是 Python 环境的位置，
    # 如果我们没有使用 venv ，直接配置 Python 的安装位置即可。
    # 如果使用了 python -m venv venv 生成了 venv，我们需要配置主 Pthon 执行程序和 venv 地址两个。
    WSGIPythonHome "**/venv;**/Python/Python36"

    # WSGIScriptAlias 表示将 / 路径下的访问转到 wsgi 处理。
    # 第一个代表路径 / 表示根路径
    # 第二个参数是项目的 wsgi.py 文件的地址
    WSGIScriptAlias / **/django_project/django_project/wsgi.py

    # WSGIPythonPath 确保你的项目包能从 Python path 导入；换句话说， import mysite 能正常工作。
    # 注意：如果使用了 python -m venv venv 生成虚拟环境，
    # 因为 python 基础包不会复制过来，虚拟环境使用的是主 python 的基础包。
    # 但是 apache 在该配置下找报，如果不包括主 python 环境的基础包路径，会造成 import 基础包找不到而报错。
    # 所以还要包括主 python 环境的基础包路径。
    # 下面的配置包括三个参数，1。项目的路径。2.虚拟环境下 pip 安装包的安装路径。3. 主 python 的基础包路径。
    WSGIPythonPath "**/django_project;**/venv/Lib/site-packages;**/Python/Python36/lib"
    # 没什么解释的，就是声明 Apache 需要 wsgi.py 文件的访问权限。
    <Directory **/django_project/django_project>
    <Files wsgi.py>
        Require all granted
    </Files>
    </Directory>

## 运行

我们运行：

    httpd.exe -t

检测配置文件是否正确。

运行：

    httpd.exe -k install

将 httpd 当作服务注册。可以在 services.msc 中管理服务的运行。

使用：

    httpd.exe -h

查看其他帮助吧

## 参考


1. [Django 官方文档](https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/modwsgi/)
2. [mod-wsgi 文档](https://pypi.org/project/mod-wsgi/)
3. [windows Apache 下载地址](https://www.apachelounge.com/download/)