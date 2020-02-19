title: Golang 语法速览（一）
date: 2020-02-14 17:04:41
tags: Golang 语法
Category: Golang

## 语句

Go 的语句使用换行分割。语句末尾不需要任何符号。

## 常量

使用 const 关键字声明常量：

    const a = "hello"

## 变量

Go 的变量遵循，**先声明，后使用**。未声明的变量直接使用，编译器会报出错误。

这样的设计方式，可以在编写代码的时候，由编译器执行检查，防止程序员误使用了没有声明的变量。造成莫名其妙的简单错误。

### 声明变量

Go 使用以下语法声明变量：

    var name type

其中，var 代表 name 是变量，type 是变量类型，可以是内置的基本变量类型，也可以是我们自己定义的变量类型。我们可以这样用：

    var a bool

表示我们声明了一个变量 **a**，他的类型是 **bool**。

声明一个变量的同时，Go 会给变量一个默认值，数字类型是 0，bool 是 false，字符串是 ""。

### 同时声明多个变量

我们也可以在一行中同时声明多个变量，使用 , 分割：

    var a,b,c,d bool

声明变量 a,b,c,d 都是 bool 类型

### 多个变量赋值

    var a,b,c,d bool = true, false, true, false

### 变量赋值

声明变量之后，可以对变量赋值。比如上面我们声明一个 bool 类型 a 变量。我们可以使用：

    a = true

把 a 的值设置为 **true**。

### 声明同时赋值

也可以在声明的同时，给变量赋值，甚至可以给多个变量赋值：

    a := true
    b, c := true, "str"

这样的用法，可以不用指定变量的类型，Go 编译器会自动检测。

注意，**:= 操作符只能在函数中使用。**

我们可以**在函数**中使用了 := 操作符，完成了声明同时赋值的过程，上面的语句等于：

    var a = true
    var b, c = true, "str"

我们在声明变量的同时，可以直接给变量赋值，这是不需要指明变量的类型，Go 会自己推测。也可以同时给多个变量赋值，多个变量赋值时，甚至多个变量可以不是同一个类型的。

> := 在 Go 中，**只能在函数中使用**，是声明同时赋值的意思，而在 Python3.8 新特性中，:= 主要是避免表达式多次执行。

## 变量类型

### 内置类型

Go 由几个基本类型：

    bool
    string
    int  int8  int16  int32  int64
    uint uint8 uint16 uint32 uint64 uintptr
    byte // 其实就是 uint8
    rune // 其实就是 int32
    float32 float64

    complex64 complex128

计算机存储数据使用的是 01，每个每个 0 或者 1 代表一个 bit。

通常情况下 int 和 unit 类型在 32 bit 系统是 32 bit 的，在 64 bit 系统是 64 bit 的。

我们平常使用的人类可读的字符串，是根据“编码”（比如 utf-8）将内容编码，存储起来。

### 类型转换

Go 使用语法 T(v) 来转换类型：

    var i int = 42
    var f float64 = float64(i)
    var u uint = uint(f)

## 函数


### 入口函数

下面就 Go 的入口函数：

    func main() {
        fmt.Println("Welcome!")
    }

Go 使用 func 声明一个函数。一个函数**可以有也可以没有参数**。

### 函数语法

**参数类型**：我们在参数明后面标识出参数的类型。

**返回值类型**：在函数后面标志函数返回值类型。

像下面这个函数，拥有两个 int 类型的参数，返回值也是 int：

    func add(a int, b int) int {
        return a + b
    }

同样的，我们可以用声明变量类型的语法来声明函数参数：

    func add(a, b int) int {
        return a + b
    }

### 函数调用

我们调用上面的 add 这样做：

    add(1, 2)

1, 2会根据位置，赋值给a, b。

### 函数的多返回值

Go 的函数可以返回多个值，比如，我们要交换 a, b 的值，传统的做法要声明一个中间缓存变量，来交换 a 和 b 的值。

我们也可以使用函数，来实现这个功能。


    func swap(x, y string) (string, string) {
        return y, x
    }

    func main() {
        a, b := swap("hello", "world")
        fmt.Println(a, b)
    }

上面 a 和 b 会交换赋值给 b 和 a。

### 命名的返回值

我们修改下上面的交换位置的函数，实现同样的结果：

    func swap(x, y string) (a string, b string) {
        a = y
        b = x
        return
    }

    func main() {
        a, b := swap("hello", "world")
        fmt.Println(a, b)
    }

声明返回值类型的时候，可以直接指定返回值的名字。

在函数返回的时候，直接使用 **return** Go 会自动检测返回值，并且按照相应的位置返回。