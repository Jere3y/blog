Title: 在 Ubuntu 上部署 Django 项目
Date: 2019-10-25 23:59
Category: Python
Tags: Django
Summary: Ubuntu + Apache2 + mod_wsgi + Django 

## 部署前准备

需要安装 pip、apache2、和 libapache2-mod-wsgi

如果 Python 版本是 2.0 版本，使用 apt 安装三个软件：

    sudo apt-get install python-pip apache2 libapache2-mod-wsgi

如果 Python 版本是 3.0 版本，运行如下命令：

    sudo apt-get install python3-pip apache2 libapache2-mod-wsgi-py3

> 主要注意 mod-wsgi 和 Python 对应版本。

## 开始部署

假设，已经有了完成的 Django 项目，项目的名字叫做 mysite

### 在 apache2 的网站配置文件夹中，新建 **mysite.conf**

> /etc/apache2/sites-available/youproject.conf

编辑文件内容：

    <VirtualHost *:80>

        <Directory /var/www/html/projects/venv/mysite/mysite>
            <Files wsgi.py>
                Require all granted
            </Files>
        </Directory>

        WSGIDaemonProcess mysite python-path=/var/www/html/projects/venv/mysite python-home=/var/www/html/projects/venv
        WSGIProcessGroup mysite
        WSGIScriptAlias / /var/www/html/projects/venv/mysite/mysite/wsgi.py
    </VirtualHost>

下面详细说明参数的含义：

* 要确保有对 wsgi.py 的访问权限 
* WSGIDaemonProcess WSGIProcessGroup 两个参数都是 **mysite**，这里的 mysite 是 Apache 在服务 Django 应用程序时将引用的进程组的名称，所以这两个名称应该是一样的。
* python-path 这个参数应该是指向 Django 项目的根目录
* python-home 指向的是 Python venv 的目录
* WSGIScriptAlias 参数告诉 apache 服务器，访问网页根目录，将导向到 wsgi.py 文件

保存上面的文件，激活该配置；

    a2ensite /etc/apache2/sites-available/youproject.conf

测试配置是否正确：

    apachectl configtest

如果配置正确无误，重启 apache2 服务器，完成网站部署：

    service apache2 restart

## 说明

如果碰到权限问题，请使用 sudo 命令。