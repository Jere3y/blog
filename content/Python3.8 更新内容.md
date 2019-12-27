Title: Python3.8 更新内容
Date: 2019-10-16 08:06
Category: Python
Tags: Python3.8 更新内容

## 更新时间

Python3.8 版本在 2019 年 10 月 14 日更新。让我们看看**对比 Python3.7** 都更新了什么内容。

本文只总结几个码代码时能用得到的新特性，诸如“性能提升”之类的，不在本文中详细说明。

## 新的赋值表达式

**:=** 作为新增操作符，官方称为“海象运算符”。

主要有以下作用：

1. 减少一些表达式的调用
2. 使代码更加优雅
3. 更加适当的作用域

下面用一个简单的例子来说明，没有赋值表达式的情况：

    # size 的作用域
    size = len(a)
    if size == 10:
        return size


使用了赋值表达式之后：

    if size := len(a):
        # size 的作用域
        return size

具体关于赋值表达式的详细说明，请看另一篇文章[Python3.8 的赋值表达式还能这么用]()

## 只限位参数

在形参中增加 \ 表示某些参数必须只能使用限制位置的参数而**不能使用关键字的**形式。

比如下面的函数

    # 参数 a,b 是仅限位置的参数
    # e,f 必须是关键字参数
    # c,d 可以使用位置或者关键字参数
    def fun(a, b, /, c, d, *, e, f):
        print(a, b, c, d, e, f)

我们调用上面的函数时，可以这样：

    # 其中 c,d 可以使用或者不使用关键字
    fun(10, 20, 30, d=40, e=50, f=60)

以下的调用时不合法的：

    # b 不能是关键字参数
    fun(10, b=20, c=30, d=40, e=50, f=60)
    # e 必须是关键字参数
    fun(10, 20, 30, 40, 50, f=60) 

关于**只限位参数**，**关键字参数**，请看文章[Python 函数的参数详解](./python-han-shu-de-can-shu-xiang-jie.html)   

## f-string 支持使用 = 更方便调试和日志

如下代码，

    a = 123
    print(f"{a=}")

会输出：

    a=123

是不是很方便？

## asyncio

asyncio 模块的 asyncio.run() 已经成为标准 API。

如下代码：

    import asyncio

    async def main():
        await asyncio.sleep(100)
        return 'run success'

    asyncio.run(main())

和以下代码是等价的：

    import asyncio

    async def main():
        await asyncio.sleep(100)
        return 'run success'

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        loop.run_until_complete(main())
    finally:
        asyncio.set_event_loop(None)
        loop.close()


## 参考

1. [Python PEP 572](https://www.python.org/dev/peps/pep-0572/)
2. [Python docs](https://docs.python.org/3.8/whatsnew/3.8.html)