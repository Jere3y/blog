title: Dart List 列表的语法糖 
date: 2020-01-08 19:53:41
tags: Dart语法糖,Dart列表操作
Category: Dart

## spread operator (...)

不知道咋翻译这个操作符。

Dart 2.3 新增 ... 操作符。

使用 ... 可以简单方便的把一个列表的所有元素插入到另一个列表中。

    var list = [1, 2, 3];
    var list2 = [0, ...list];
    assert(list2.length == 4);

上面的代码 ...list，将 list 分解开，插入到了 list2 中，执行完代码后。

list2 的值为 [0,1,2,3]。

## null-aware spread operator (...?)

还是不知道咋翻译这个操作符。

Dart 2.3 新增 ...? 操作符。

如果 list 是 null，我们可以使用 ...? 来拆分 list。如下代码：

    var list;
    var list2 = [0, ...?list];
    assert(list2.length == 1);

上面的例子中，...? 在判断 list 为 null 后，不会造成异常。

## 列表中使用 if

Dart 2.3 新增功能。

看例子：

    var nav = [
    'Home',
    'Furniture',
    'Plants',
    if (promoActive) 'Outlet'
    ];

如果 promeActive 的值是 true，**则把 'Outlet' 插入到 nav 中。**

如果 promeActive 的值是 false，则不执行操作。

## 列表中使用 for

Dart 2.3 新增功能。

    var listOfInts = [1, 2, 3];
    var listOfStrings = [
    '#0',
    for (var i in listOfInts) '#$i'
    ];


上面的例子，将 listOfInts 的值，都插入到了 listOfStrings 中。

'#$i'　这个代表将 i 的值转换成为 String

我们如果使用 ... ,则没有办法对列表中的元素执行转换.

## 参考

1. [Dart tour](https://dart.dev/guides/language/language-tour#spread-operator)

