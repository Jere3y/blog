title: 编码技术（一）Base64
date: 2018-02-03 11:26:27
tags: 加密、签名、证书,Java,Python


## 标准的 Base64 编码

先给出 RFC3548 给出的 Base64 定义。

> The Base 64 encoding is designed to represent arbitrary sequences of octets in a form that requires case sensitivity but need not be humanly readable. 

可以看出，Base64 编码算法主要有几个特点：

- 表示任意 8 位 bit
- 不需要人类可读
- 编码和解码简单
- 编码后数据变大约 33%

下面详细说下 Base64 算法的步骤：

1. 将要编码的字符串使用 ASCII 对照，转换为二进制形式。
2. 每 6 个二进制位，编码成新的字符。结果就是 Base64 结果。
3. 如果 1 步骤的字节数（8 二进制位）不是 3 的倍数，不足的二进制位，使用 0 来补位，对应的 Base64 编码使用 = 来代替

标准的 Base64 编码使用使用 A-Z a-z 0-9 + / 一共 64 个字符来对应 0-63。使用 = 来代表补位的 0。

{% asset_img base64.png Base64 编码表 %}

> Base64 编码一共使用了 65 个字符进行编码

因为 2^6 = 64，所以 Base64 算法只能表示所有 6 个二进制位的情况。

假设要编码的字符为 A（下面提供 Base64 对照表和 ASCII 对照表）：

1. 先找出 A 的对应 ASCII 码（二进制形式），0100 0001。因为 A 为一个字符，需要凑够 3 个字符，补足 0 后，二进制形式为 0100 0001 0000 0000 0000 0000
2. 取 A 的前六位 0100 00，在 Base64 编码表中找出对应的字符，Q。
3. 取 A 的第二个六位 01 0000 ，查表后，得到编码后的字符为 Q。
4. 后面的 12 个 0 都是补位，使用 == 编码
5. A 的最后编码是 QQ==

## 在 Python3 中使用 Base64

Python3 官方提供了 [RFC3548](https://tools.ietf.org/html/rfc3548#page-4) 的 Base64 编码实现。

        import base64

        encoded_a = base64.b64encode(b'http://apie.site/')
        print(encoded_a)
        # b'aHR0cDovL2FwaWUuc2l0ZS8='

        url_safe_a = base64.urlsafe_b64encode(b'http://apie.site/')
        print(url_safe_a)
        # b'aHR0cDovL2FwaWUuc2l0ZS8='

其中 [Python3 doc](https://docs.python.org/3/library/base64.html) 方法 base64.b64encode(s, altchars = None)，其中第二个参数可以自己指定标准 Base64 表的 + / 的替代字符。

## 在 URL（或者文件名） 中使用 Base64

在 URL 中，/ 和 + 字符变为形如 %XX 的形式，而 % 在数据库中，是作为通配符的。

为了解决这个问题，在 URL 中的 Base64 的算法做了如下改变：

1. 标准中的 / + 转换成了 - _ 

## 其他变种的 Base64 

实际就是将各个系统中作为关键字符的第 63 64 位字符替换成相应不冲突的字符使用。

还有 Base32 Base16 等编码算法。原理同 Base64 类似

## 参考

1. [Python3 doc](https://docs.python.org/3/library/base64.html)
2. [ASCII 对照表](http://ascii.911cha.com/)
3. [RFC3548](https://tools.ietf.org/html/rfc3548#page-4)
4. [RFC2045](https://tools.ietf.org/html/rfc2045#page-24)

