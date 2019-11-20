Title: PYPI 切换国内源
Date: 2019-11-20 23:59
Category: 其他
Authors: xin
Tags: 国内源

## 临时使用

    pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package

some-package 是想要安装的包的名字。例如，想要安装 requests

    pip install -i https://pypi.tuna.tsinghua.edu.cn/simple requests

## 设为默认

升级 pip 到最新的版本 (>=10.0.0) 后进行配置：

    pip install pip -U
    pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

如果您到 pip 默认源的网络连接较差，临时使用本镜像站来升级 pip：

    pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pip -U

## 参考资料

1. [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/pypi/)