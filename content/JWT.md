title: JWT
date: 2018-01-29 19:12:07
tags: 前后端分离,token
Category: Web


## 什么是 JWT

JWT 是 JSON Web Token 的缩写。

首先，JWT 是一个 token。

JWT 是一个标准 [**RFC 7519**](https://tools.ietf.org/html/rfc7519)。定义了使用**紧凑**、**自我描述**的方式在服务端、客户端之间**安全**使用 JSON 传输信息的标准。

简答的说，JWT 就是定义了如何生成 token 的标准。

下面详细的解释下 JWT 定义的几个重要的关键词。

- 紧凑：因为 JWT 数据量小的特性。JWT 可以通过拼接在URL、POST 或者 HTTP 头信息中传递。同样，因为数据量比较小，所以传输的效率也会很快。
- 自我描述：JWT 携带的数据包括了所有关于用户的信息。这避免了服务端多次查询数据库所造成的性能损失。
- 安全：JWT 使用数字签名，这个下面会详细的介绍。

## 使用 JWT 的场景

下面举例一些比较常见的 JWT 的使用场景：

- 授权（Authentication）：这个是使用 JWT 最常见的场景。一旦用户登录后，每一个后续请求都会包括 JWT 来允许用户访问**这个 token 授权访问**的路由、服务、资源。单点登录是目前最广泛使用的 JWT 功能，因为 JWT 的开销低并且 JWT 能轻松在不同的域（domain）下访问。
- 信息交换（Information Exchange）：在客户端、服务端间交换信息，JWT 是一个非常好的、安全的交换方式。因为 JWT 可以使用签名，例如，使用公钥、私钥对你就可以确定发送信息的是谁、发送了什么。此外，因为使用了头信息（Header）和荷载（Payload）来进行签名的计算，你还可以确定这个信息是否被篡改。

## JWT 的构成

JWT 由三个部分组成每个部分之间使用英文句号链接（.）:

1. 头信息（Header）
2. 荷载（Payload）
3. 签名（Signature）

也就是说，一个完整的 JWT 就像下面这样：

> header.payload.signature

下面详细的解释下各个组成部分：

### 头信息（Header）

头信息就是对 JWT 整体的描述。包括两个部分：1. 数据的类型（typ），就是 JWT。2. 签名使用的算法(alg)，像下面这样；

    {
        "typ":"JWT",
        "alg":"HS256"
    }


然后用 BASE64 来编码下，就是 JWT 的第一部分内容。

### 荷载（Payload）

JWT 的第二个部分就是 JWT 的主体内容，是包括了 claim（要求？请求？） 的荷载。claim 是描述实体（Entity）和其他附加元数据的语句。下面列举三种类型的 claim ：标准已注册的 claim（Registered claims），公共 claim（Public claims）和私有 claim（Private claims）。

1. 标准已注册的 claim ：标准给定义好了一些 claim （非强制，推荐），比如 iss （发行人）、exp（过期时间）、sub（主题）、aud（听众）、nbf（Not Before）。
2. 公共 claim （Public claims）：这可以由使用 JWT 的开发人员自己定义。要避免冲突，防止和**标准已注册好的 claim **重名。
3. 私有 claim（Private claims）：这些是为了两方共享信息而自定义的 claims。既不是注册 claim 也不是公共 claim。

一个荷载的样子应该是这样:

    {
        "sub":"1",
        "name":"Jack",
        "admin":true
    }

把上面的 JSON 使用 Base64 编码后，就是 JWT 的第二部分。

> 这些 claim 的 KEY 都是 3 个字母的，主要就是为了减少 JSON 的传输大小。

### 签名（Signature）

想要创建签名。应该有一下内容。

1. base64 编码的 JWT 头
2. base64 编码的 JWT 荷载
3. 加密的密码
4. 加密的算法（这个在头信息定义了）

有了以上信息，就可以开始签名了。

例如，如果要使用 HMAC SHA256 算法（密码是 secret）进行加密，代码如下：

    HMACSHA256(
        base64UrlEncode(header) + "." +
        base64UrlEncode(payload),
        secret
    )

签名后，可以确定这个请求是**谁发的**，**发的内容是什么**，**内容是否被篡改**。

以上就是 JWT 的第三部分的内容。

### 把上面的内容拼接起来

使用英文句号（.）将上面三部分的内容拼接起来就是 JWT。

> 可以使用[ jwt debugger ](https://jwt.io)来解码、验证或者生成 JWT。

## 如何使用 JWT

当用户使用账号、密码（或者其他能登陆的凭据，比如短信验证码）登陆成功后，一个 JWT 就会由服务端返回，客户端必须将 JWT 存在本地（比如 Local storage，如果非要使用 cookie 也没毛病）。

> 传统的做法是服务端创建一个对话并返回 cookie。

当用户想要访问受保护的资源的时候，用户代理（比如：浏览器、APP）必须要将 JWT 放置在 HTTP **Authorization** 头中，并且使用 **Bearer** 模式，像下面这样：

    Authorization:Bearer <JWT>

这是一种无状态的授权验证机制，因为用户的登录信息没有保存在服务端。用户代理在访问受保护的资源时，服务端会检查 Authorization 头信息中的 JWT 的合法性，如果合法，则返回相应的信息。因为 JWT 是“自我描述”的，所有必要的信息都会包括在这里，所以服务端不用再查找数据库进行比对。

这样，可以完全依赖无状态的 API，甚至可以向下游的其他服务端发出请求。不论哪个域名在使用 API，CORS 都不会是问题，因为 JWT 不使用 cookie。

下面说明 JWT 的使用 6 步骤流程：

1. 用户在客户端（可能是 WEB 也可能是 APP）使用自己的凭证（比如账号密码，手机验证码等方式）登录，POST users/login
2. 服务端接收到登录请求，生成使用密码生成 JWT
3. 服务端返回 JWT 到客户端
4. 客户端在 Authorization 头信息中携带 JWT 请求服务端其他接口，像下面这样：

        Authorization:Bearer <JWT>

5. 服务端检查 JWT 的真伪。并且从 JWT 中获得想要获得的信息（用户信息，token 失效时间之类的）。
6. 服务端响应客户端请求。

## 为什么要使用 JWT

### 数据小

众所周知，JSON 比 XML 格式的数据更加精炼。更适合使用在 HTTP 环境中。

### 安全

可以使用算法进行签名，防止数据被篡改。

### 通用

JSON 解析器在各种语言中都存在。不论在服务端还是客户端都解析的十分方便。 


## 参考

1. [RCF7519](https://tools.ietf.org/html/rfc7519)
2. [jwt.io](https://jwt.io)


