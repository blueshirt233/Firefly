---
title: shell基础运用
published: 2026-05-23
pinned: false
description: shell基础运用
tags:
  - shell
draft: false
category: 教程
---

## 一、Shell 、Shell 命令、Shell 脚本

### 1、Shell 是什么？

**Shell** 是操作系统与用户之间的桥梁，它接收用户输入的命令，并调用系统内核去执行相应的任务。在 Linux 系统中，最常用的 Shell 是 **Bash（Bourne Again Shell）**。我们平时在终端中输入的命令，实际上都是通过 Shell 来解析和执行的。

Shell 不仅是一个交互工具，更是一种具备编程能力的“命令解释器”。它允许我们将多个命令写入一个脚本文件中，批量执行，从而实现自动化操作。

### 2、Shell 命令是什么？

Shell 命令是 Linux 系统操作的核心工具，比如我们常用的 `ls`、`cd`、`cp`、`echo` 等命令，都是在 Shell 中运行的指令。

需要注意的是：

+   `ls` 是一个命令（程序）
    
+   Shell 是一个解释器（工具）
    
+   你输入的 `ls` 命令是由 Shell 接收并解析，交给系统执行的
    

换句话说，**Shell 是“命令解释器”，`ls` 是 Shell 能调用的“命令”**。

### 3、什么是 Shell 脚本？

**Shell 脚本（Shell Script）** 是一系列 Shell 命令的集合，保存在一个文本文件中，按照顺序依次执行。

通俗地讲：你在终端一个个敲的命令，可以提前写进一个 `.sh` 文件中，将其变成一个“可执行的任务集合”，以后只需要运行这个文件，就能一次性执行所有操作，无需手动重复输入。

### 总结一句话：

**Shell 是工具**，负责与系统交互

**Shell 命令是操作单位**，如 `ls`, `rm`, `echo（常用的liunx命令很多都是shell命令）`

**Shell 脚本是程序**，可以批量执行命令，实现自动化处理

## 二、常用 Shell 命令与注释写法

### 1、创建shell脚本： 

Shell 脚本（Shell Script）是将多个命令按照顺序写入一个文件中，通过一次执行这个文件，来自动完成一系列任务。文件名通常以 `.sh` 结尾，但是这不是必须的，以.SH结尾只是更好人程序员知道这是个shell脚本

> touch demo.sh

### 2、shell脚本的开头：

首先以如下开头：

> #!/bin/bash  

这一行叫做 **“shebang（哈希邦）”**，它是所有 Shell 脚本中非常重要的一行，

作用是：指定脚本的解释器，**告诉操作系统用 `/bin/bash` 这个程序来解释执行当前脚本。**

### 3、注释的使用：

> #->单行注释

> :<<!
> 
>     多行注释
> 
> ！

```bash
#!/bin/bash   
# 单行注释
# 这是一个单行注释 
# 多行注释（使用 Here 文档技巧）
:<<!
这是一段多行注释可以写很多行
!
```

 如下是一个简单的案例： 

```bash
#!/bin/bash#单行注释
:<<!
多行注释
!
#输出printf
echo "hello shell"
#创建文件夹
mkdir ./one
#创建文件touch ./txt.txt
#在txt.txt写入数据
echo "hello shell">>./txt.txt 
```

### 4、执行方法：

> bash demo.sh   #利用bash命令执行脚本文件，本质就是使用Shell解析器运行脚本文件

> sh demo.sh  #用sh命令执行脚本文件，本质就是使用Shell解析器运行脚本文件

> \# 或者  
> chmod +x demo.sh  
> ./demo.sh
> 
> #执行当前目录下的脚本文件  
> #脚本文件自己执行需要具有可执行权限，否则无法执行

区别：sh或bash执行脚本文件方式是直接使用Shell解析器运行脚本文件,不需要可执行权限仅路径方式是执行脚本文件自己,需要可执行权限

![bbe228ea702d40c59988c59c7439f50a.png](https://tu.2644536256.date/file/blog/wengzhang/1779544709122_bbe228ea702d40c59988c59c7439f50a.png)
![157c83dfbe0c4f0c84f7aabfeaa99f6f.png](https://tu.2644536256.date/file/blog/wengzhang/1779544718669_157c83dfbe0c4f0c84f7aabfeaa99f6f.png)

## `三、echo` 命令的使用

`echo` 是 Shell 脚本中非常常用的命令，它用于向终端输出文本、变量的值，或者将输出内容重定向到文件。了解 `echo` 的各种用法，可以帮助你更好地调试脚本、展示结果或保存数据。

### 1、 基本语法

```less
echo [选项] [字符串]
```

**选项**：用于修改 `echo` 命令的行为（如是否输出换行符、是否支持转义字符等）。

**字符串**：是你想要输出的文本、变量等内容。

### 2、常用选项

1.  **`-n`**：不输出换行符
    
    +   默认情况下，`echo` 会输出换行符，如果你不想要换行符，可以使用 `-n` 选项。
        
    
    ```bash
    echo -n "Hello, World!"
    echo "This is on the same line."
    ```
    
    输出：
    
    ```bash
    Hello, World!This is on the same line.
    ```
    
2.  **`-e`**：启用转义字符
    
    +   默认情况下，`echo` 不会解析一些特殊的转义字符，如 `\n`、`\t` 等。使用 `-e` 选项后，`echo` 会解析这些转义字符。
        
    
    ```bash
    echo -e "Hello\nWorld"
    echo -e "Name\tAge"
    ```
    
    输出：
    
    ```bash
    HelloWorldName    Age
    ```
    
3.  **`-E`**：禁用转义字符
    
    +   如果你不想让 `echo` 解析转义字符，可以使用 `-E` 选项。
        
    
    ```php
    echo -E "Hello\nWorld"
    ```
    
    输出：
    
    ```bash
    Hello\nWorld
    ```
    

### 3、输出变量的值

`echo` 很常用于输出变量的值：

```php
name="Alice"
echo "Hello, $name!"
```

输出：

```bash
Hello, Alice!
```

你也可以使用大括号来明确变量范围，特别是在变量名后面跟着其他字符时：

```bash
name="Alice"echo "Hello, ${name}123!"
```

输出：

```bash
Hello, Alice123!
```

### 4、输出文本到文件

你还可以将 `echo` 的输出重定向到文件中：

```bash
echo "This is a test." > test.txt
```

+   使用 `>` 会将内容写入文件并覆盖原有内容。
    
+   使用 `>>` 会将内容追加到文件末尾。
    

```bash
echo "This is another test." >> test.txt
```

### 5、 结合脚本和输入输出

在 Shell 脚本中，`echo` 常常用于输出调试信息或者展示用户输入的结果：

```bash
#!/bin/bash
echo "Please enter your name:"
read name
echo "Hello, $name!"
```

运行后，脚本会提示用户输入名字并输出问候语：

```delphi
Please enter your name:
Alice
Hello, Alice!
```

完整代码： 

```bash
#!/bin/bash
echo  
echo -n "Hello, World!"
echo "This is on the same line."
echo  echo -e "Hello\nWorld"
echo -e "Name\tAge"
echo  
echo -E "Hello\nWorld"echoname="Alice"
echo "Hello, $name!"echoname="Alice"
echo "Hello, ${name}123!"
echo
echo "This is a test." > test.txt
echo
echo "Please enter your name:"
read name
echo "Hello, $name!"
```

运行结果： 

![c5ba0bdb72c64cc3808044774fcafb42.png](https://tu.2644536256.date/file/blog/wengzhang/1779544736492_c5ba0bdb72c64cc3808044774fcafb42.png)

### 6、总结

| 用法 | 示例 | 说明 |
| --- | --- | --- |
| 输出文本 | `echo "Hello, World"` | 输出指定的文本 |
| 不换行输出 | `echo -n "Hello"` | 不换行 |
| 启用转义字符 | `echo -e "Hello\nWorld"` | 启用转义字符 |
| 输出变量值 | `echo "Hello, $name"` | 输出变量的值 |
| 输出到文件 | `echo "Text" > file.txt` | 输出内容并覆盖文件 |
| 追加到文件 | `echo "Text" >> file.txt` | 追加内容到文件末尾 |

## 四、Shell 变量类型

Shell 中的变量可以分为以下几类：

### 1、系统环境变量（Environment Variables）

![515665904bc74d66b08e6f44963b383d.png](https://tu.2644536256.date/file/blog/wengzhang/1779544818108_515665904bc74d66b08e6f44963b383d.png)

这些变量由系统定义，用于控制 Shell 的运行环境。常见的系统环境变量包括：

| 变量名 | 含义说明 |
| --- | --- |
| `PATH` | 可执行文件的搜索路径 |
| `HOME` | 当前用户的主目录路径 |
| `SHELL` | 使用的 Shell 类型（如 `/bin/bash`） |
| `USER` | 当前用户名 |
| `PWD` | 当前工作目录 |
| `LANG` | 语言与地区设置 |

示例：

```bash
echo $HOMEecho $USERecho $PATH
```

![f29a0818707e4adeab377c820c1288d9.png](https://tu.2644536256.date/file/blog/wengzhang/1779544985270_f29a0818707e4adeab377c820c1288d9.png)

设置环境变量：

```bash
export VAR_NAME=value   # 临时设置
```

若想永久生效，可写入 `~/.bashrc` 或 `~/.profile` 等配置文件。

>  二、自定义变量（User-defined Variables）

由用户在脚本中定义，用于存储值或中间结果。

### 1、定义变量：

变量定义规则  
        1.变量名称可以有字母,数字和下划线组成,但是不能以数字开头

        ⒉.等号两侧不能有空格  
        3.在bash环境中,变量的默认类型都是字符串类型,无法直接进行数

        4.变量的值如果有空格,必须使用双引号括起来  
        5.不能使用Shell的关键字作为变量名称

```bash
name="Tom"age=20
```

使用变量：

```bash
echo "My name is $name, I am $age years old."
```

注意事项：

`=`两边不能有空格。

变量名区分大小写。

![6b2b41ecc41b40c9b906471647217863.png](https://tu.2644536256.date/file/blog/wengzhang/1779545026096_6b2b41ecc41b40c9b906471647217863.png)

###  2、局部变量（函数中）使用 `local` 关键字：

```bash
myfunc() {  
local temp="hello"  
echo $temp
}
```

### 3、`declare`

是 Bash 中的一个内建命令，主要用于**声明变量并设置其属性**，相比于普通的赋值，它可以精细控制变量的类型和行为。

###  `declare` 的基本用法

```bash
declare [选项] 变量名=值
```

#### 常用选项

| 选项 | 说明 |
| --- | --- |
| `-r` | 只读变量（readonly） |
| `-i` | 整数变量，只能执行数学运算 |
| `-a` | 数组变量 |
| `-A` | 关联数组变量（键值对） |
| `-x` | 导出为环境变量（类似 export） |
| `-f` | 显示已定义的函数 |
| `-p` | 显示变量定义信息 |

* * *

### 示例详解

####  声明只读变量

```bash
declare -r pi=3.14
pi=3.14159   # 报错：只读变量不能修改
```

![745aa0863980496b9b901bb34937860d.png](https://tu.2644536256.date/file/blog/wengzhang/1779545068281_745aa0863980496b9b901bb34937860d.png)

#### 声明整数变量并进行计算

```bash
declare -i num=5
num=num+3
echo $num  # 输出：8
```

注意：如果 `num="hello"`，则输出为 `0`，因为字符串不能当作整数。

![a5b1f7b9c7304ee0b6a951b853d89736.png](https://tu.2644536256.date/file/blog/wengzhang/1779545430714_a5b1f7b9c7304ee0b6a951b853d89736.png)

####  声明数组变量

```bash
declare -a fruits=("apple" "banana" "cherry")
echo ${fruits[1]}  # banana
```

![a293496ae8544a18a199dcd25b9d21ba.png](https://tu.2644536256.date/file/blog/wengzhang/1779545455759_a293496ae8544a18a199dcd25b9d21ba.png)

####  声明关联数组（Bash 4+）

```bash
declare -A info
info[name]="Tom"
info[age]=22
echo ${info[name]}  # Tom
```

![90ac0d919afd42189931c4903a77f537.png](https://tu.2644536256.date/file/blog/wengzhang/1779545523816_90ac0d919afd42189931c4903a77f537.png)

#### 查看变量声明信息

```bash
declare -p fruits
declare -p info
```

![0071d5b0426446588e925acc7d685c7f.png](https://tu.2644536256.date/file/blog/wengzhang/1779545538614_0071d5b0426446588e925acc7d685c7f.png)

#### 将变量声明为环境变量（类似 `export`）

```bash
declare -x user="Alice"
```

###  `declare` 与 `local` 的关系

在函数内部，如果你想限制变量作用域为函数内，使用：

```bash
local var="inside"
```

或者结合 `declare`：

```bash
local -i count=0
```

####  小结

| 命令 | 说明 |
| --- | --- |
| `declare` | 控制变量属性（类型、安全性） |
| `declare -i` | 整数运算变量 |
| `declare -r` | 设置只读变量 |
| `declare -a/-A` | 声明数组/关联数组 |
| `declare -x` | 类似 export，用于设置环境变量 |

### `5、export` 的作用

`export` 是 Shell 中用于 **设置环境变量** 的关键命令，它的作用是将变量从当前 Shell 中导出，使其对子进程（如脚本或其他程序）可见。

当你使用 `export` 时，变量就从“局部变量”变成了“环境变量”。

简单说有点类似与C语言中的“extern”关键字

```bash
变量名=值export 变量名
```

或者直接写成一行：

```bash
export 变量名=值
```

###  示例演示

#### 不使用 `export`

```bash
#!/bin/bash
var1="hello"./child.sh
```

`child.sh` 内容：

```bash
#!/bin/bash
echo $var1   # 输出为空
```

说明：子脚本 `child.sh` 无法访问父脚本中定义的变量 `var1`。

#### 使用 `export`

```bash
#!/bin/bash
export var1="hello"./child.sh
```

现在 `child.sh` 能正确输出：

```bash
hello
```

* * *

### 小知识

+   只对当前 shell 会话及其子进程有效。
    
+   若想永久设置，可写入 `~/.bashrc`、`~/.profile` 等文件。
    
+   查看当前所有环境变量：
    
    ```bash
    export
    env
    ```
    

>  env  #查看系统环境变量

![0f2d9c9af28f4abaa375c1cbdda22223.png](https://tu.2644536256.date/file/blog/wengzhang/1779545626336_0f2d9c9af28f4abaa375c1cbdda22223.png)

####  小结

| 命令 | 作用 |
| --- | --- |
| `export var=value` | 设置环境变量，子进程可访问 |
| `export` | 显示所有已导出的环境变量 |

### 3、特殊符号变量（位置参数与特殊符号）

这些变量由 Shell 自动维护，用于获取命令行参数、状态等信息。

| 变量 | 含义 |
| --- | --- |
| `$0` | 当前脚本名称 |
| `$1~$9` | 第1~9个位置参数 |
| `${10}` | 第10个及以上的参数 |
| `$#` | 参数个数 |
| `$*` | 所有参数（作为一个整体） |
| `$@` | 所有参数（逐个分隔） |
| `$?` | 上一条命令的退出状态（0 成功，非0 失败） |
| `$$` | 当前脚本的进程 ID |
| `$!` | 上一个后台命令的进程 ID |

示例：

```bash
echo "n1=$1 n10=${10}"
echo "all* :$*"
echo "all@ :$@"
for n in "$*"
do 
	echo $n
done 
for n in "$@"
do  
	echo $n
done 

echo "n_num=:"$#
```

![0744e1d86eff4458a6ab28d44e13821f.png](https://tu.2644536256.date/file/blog/wengzhang/1779545707075_0744e1d86eff4458a6ab28d44e13821f.png)

![0b11e53c0e974313bb0eb5124ae54d9e.png](https://tu.2644536256.date/file/blog/wengzhang/1779545718985_0b11e53c0e974313bb0eb5124ae54d9e.png)

### 小结

| 类别 | 作用 | 示例 |
| --- | --- | --- |
| 环境变量 | 控制系统或 Shell 行为 | `PATH`, `HOME` |
| 自定义变量 | 储存数据或临时值 | `name="Alice"` |
| 特殊变量 | 获取状态、参数等系统信息 | `$0`, `$#`, `$?` |

## 五、变量与参数使用

变量

##### 1\. **变量赋值**

在 Shell 中，变量不需要显式地声明类型。变量的赋值格式为：

```bash
variable_name=value
```

+   赋值时，`=` 两边不能有空格。
    
+   变量名通常由字母、数字、下划线组成，但不能以数字开头。
    

例如：

```bash
name="Alice"
age=25
```

##### 2\. **引用变量**

要引用变量的值，需要在变量名前加上 `$`：

```bash
echo "Name: $name"
echo "Age: $age"
```

输出：

```bash
Name: AliceAge: 25
```

##### 3\. **使用大括号引用变量**

如果你在引用变量时，后面紧接着其他字符（如数字、字母等），可以使用大括号来明确变量的边界：

```bash
echo "Name: ${name}123"
```

输出：

```bash
Name: Alice123
```

##### 4\. **只读变量**

如果你想定义一个只读变量，可以使用 `readonly`：

```bash
readonly name="Alice"
```

尝试修改只读变量会报错：

```bash
name="Bob"  # 会报错
```

##### 5\. **环境变量**

你也可以通过 `export` 命令将变量导出为环境变量，这样其他进程也能访问这个变量。

```bash
export name="Alice"
```

* * *

#### 位置参数

位置参数是脚本或函数接受的命令行参数。位置参数通过 `$1`、`$2` 等来引用，`$0` 通常代表脚本本身的文件名。

##### 1\. **获取位置参数**

```bash
#!/bin/bash
# 获取位置参数
echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
```

假设你运行脚本时输入以下命令：

```bash
./demo.sh Alice 25
```

输出：

```bash
Script name: ./demo.sh
First argument: Alice
Second argument: 25
```

##### 2\. **特殊参数**

+   **`$#`**：表示脚本或函数接受的参数个数（即位置参数的数量）。
    

```bash
echo "Number of arguments: $#"
```

+   **`$*`** 和 **`$@`**：表示所有位置参数（字符串数组），两者的区别在于：
    
    +   **`$*`**：会将所有参数当作一个单独的字符串。
        
    +   **`$@`**：会将每个参数作为一个独立的字符串。
        

```bash
echo "All arguments as a single string: $*"
echo "All arguments as separate strings: $@"
```

##### 3\. **通过位置参数传递给函数**

```bash
#!/bin/bash
my_function() {    
echo "First argument: $1"    
echo "Second argument: $2"
} 

my_function "Alice" "Bob"
```

输出：

```bash
First argument: Alice
Second argument: Bob
```

* * *

####  默认参数

在实际编程中，我们可能需要为某些参数设置默认值。可以使用 `${parameter:-default}` 来实现，如果参数为空或未设置，则使用默认值。

```bash
#!/bin/bash
name=${1:-"Guest"}  # 如果未传递第一个参数，则使用 "Guest" 作为默认值
echo "Hello, $name!"
```

如果你执行以下命令：

```bash
./demo.sh Alice
```

输出：

```bash
Hello, Alice!
```

如果你执行时不传递参数：

```bash
./demo.sh
```

输出：

```undefined
Hello, Guest!
```

* * *

#### 变量操作

1.  **获取字符串长度**
    

你可以使用 `${#variable}` 获取变量内容的长度：

```bash
str="Hello"
echo "Length of string: ${#str}"
```

输出：

```bash
Length of string: 5
```

1.  **字符串替换**
    

+   替换字符串中的第一个匹配项：
    

```bash
str="Hello World"
echo "${str/World/Shell}"
```

输出：

```bash
Hello Shell
```

+   替换字符串中的所有匹配项：
    

```bash
str="Hello World World"
echo "${str//World/Shell}"
```

输出：

```undefined
Hello Shell Shell
```

1.  **子字符串提取**
    

你可以通过 `${variable:start:length}` 来提取子字符串：

```bash
str="Hello World"
echo "${str:6:5}"
```

输出：

```undefined
World
```

* * *

#### 完整代码：

```bash
#!/bin/bash  
echo  
name="Alice"
age=25
echo "Name: $name"
echo "Age: $age"
echo "Name: ${name}123"
echo 
# 获取位置参数
echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo
echo "Number of arguments: $#"
echo
echo "All arguments as a single string: $*"
echo "All arguments as separate strings: $@"
echo
my_function() {    
echo "First argument: $1"    
echo "Second argument: $2"
}
my_function "Alice" "Bob"
echo
str="Hello"
echo "Length of string: ${#str}"
echo
str="Hello World"
echo "${str/World/Shell}"
echo
str="Hello World World"
echo "${str//World/Shell}"
echo
str="Hello World"
echo "${str:6:5}"
echo
```

运行结果：

![4dcc86193146495ca39dad053906b72f.png](https://tu.2644536256.date/file/blog/wengzhang/1779546079717_4dcc86193146495ca39dad053906b72f.png)

####  总结

| 内容 | 示例 | 说明 |
| --- | --- | --- |
| **变量赋值** | `name="Alice"` | 变量赋值，不能有空格 |
| **引用变量** | `echo $name` | 输出变量的值 |
| **位置参数** | `$1`, `$2`, ... | 获取命令行传递的参数 |
| **获取参数个数** | `$#` | 获取传递的参数个数 |
| **获取所有参数** | `$*`, `$@` | 获取所有参数 |
| **默认参数** | `name=${1:-"Guest"}` | 如果没有传递参数则使用默认值 |
| **字符串长度** | `${#str}` | 获取字符串的长度 |
| **字符串替换** | `${str/World/Shell}` | 替换字符串中的某部分 |
| **子字符串提取** | `${str:6:5}` | 获取子字符串 |

* * *

通过掌握变量和参数的使用，可以让你的 Shell 脚本更加灵活、功能更强大。如果有需要进一步学习 Shell 函数、数组等内容，也可以继续深入。

## 六、读取用户输入

在 Shell 脚本中，读取用户输入是常见的需求。你可以通过不同的命令来接收用户的输入并根据输入的内容进行处理。常见的读取用户输入的方法有 `read` 命令，它可以帮助我们从标准输入（通常是终端）中获取数据。

####  使用 `read` 命令

### 1\. **基本用法**

`read` 命令用于从用户输入获取一行数据并将其赋值给指定的变量。

```bash
#!/bin/bash
# 读取用户输入
read name
echo "Hello, $name!"
```

运行脚本后，脚本会等待用户输入，输入完成后按回车，脚本会输出 `Hello, [用户输入的内容]`。

例如：

```bash
$ ./demo.sh
Alice
Hello, Alice!
```

### 2\. **读取多个变量**

如果你想读取多个输入项，可以在 `read` 命令后列出多个变量，输入的内容会按照空格进行分割，依次赋给每个变量。

```bash
#!/bin/bash
# 读取多个变量
read name age
echo "Name: $name, Age: $age"
```

执行脚本时，用户输入两个值并用空格隔开：

```bash
$ ./demo.sh
Alice 25
Name: Alice, Age: 25
```

### 3\. **提示信息**

你可以在使用 `read` 命令时，添加提示信息，提示用户输入的内容：

```bash
#!/bin/bash
# 添加提示信息
read -p "Please enter your name: " name
echo "Hello, $name!"
```

这会在提示信息后等待用户输入：

```bash
$ ./demo.sh
Please enter your name: Alice
Hello, Alice!
```

### 4\. **设置输入超时**

可以通过 `-t` 选项来设置输入的超时时间，单位是秒。如果在指定时间内用户没有输入，`read` 命令会自动退出。

```bash
#!/bin/bash
# 设置 5 秒的输入超时
read -t 5 -p "Please enter your name: " name
if [ -z "$name" ]; then    
	echo "You took too long to respond!"
else    
	echo "Hello, $name!"fi
```

如果超时未输入，输出：

```vbnet
You took too long to respond!
```

### 5\. **隐藏输入内容**

有时你可能需要用户输入密码或其他敏感信息，此时可以使用 `-s` 选项来隐藏输入内容。

```bash
#!/bin/bash
# 隐藏输入内容（如密码）
read -sp "Enter your password: " password
echoe
cho "Password entered."
```

此时输入的内容会被隐藏，不会显示在屏幕上。

### 6\. **读取一个字符**

`-n` 选项可以让 `read` 命令只读取用户输入的一个字符：

```bash
#!/bin/bash
# 只读取一个字符
read -n 1 -p "Do you want to continue (y/n)? " choice
echo
echo "You chose: $choice"
```

在这种情况下，用户只需要输入一个字符（例如 `y` 或 `n`），然后按回车，脚本就会继续执行。

### 7\. **输入内容的分隔符**

默认情况下，`read` 命令会将用户输入的内容按空格分割成多个部分。如果你希望使用其他字符作为分隔符，可以使用 `IFS`（内部字段分隔符）变量。

```bash
#!/bin/bash
# 改变分隔符为逗号
IFS=',' read -p "Enter name,age: " name age
echo "Name: $name, Age: $age"
```

执行时，用户输入内容需要用逗号分隔：

```cobol
$ ./demo.sh
Enter name,age: Alice,25
Name: Alice, Age: 25
```

#### 示例：读取用户信息并进行判断

```bash
#!/bin/bash
# 读取用户输入的姓名和年龄
read -p "Enter your name: " name
read -p "Enter your age: " age 
# 判断年龄
if [ "$age" -ge 18 ]; then
    echo "$name, you are an adult."
    else
        echo "$name, you are a minor."
fi
```

如果输入：

```bash
Enter your name: Alice
Enter your age: 20
```

输出：

```bash
Alice, you are an adult.
```

完整代码：

```bash
#!/bin/bash
# 读取用户输入
read name
echo "Hello, $name!"
echo
# 读取多个变量
read name age
echo "Name: $name, Age: $age"
echo
# 添加提示信息
read -p "Please enter your name: " name
echo "Hello, $name!"
echo
# 设置 5 秒的输入超时
read -t 5 -p "Please enter your name: " name
if [ -z "$name" ]; then
    echo "You took too long to respond!"
    else
        echo "Hello, $name!"
fi
echo
# 隐藏输入内容（如密码）
read -sp "Enter your password: " password
echo
echo "Password entered."
echo
# 只读取一个字符
read -n 1 -p "Do you want to continue (y/n)? " choice
echo
echo "You chose: $choice"
# 改变分隔符为逗号
IFS=',' read -p "Enter name,age: " name age
echo "Name: $name, Age: $age"
echo
# 读取用户输入的姓名和年龄
read -p "Enter your name: " name
read -p "Enter your age: " agee
cho# 判断年龄
if [ "$age" -ge 18 ]; then
    echo "$name, you are an adult."
    else    
    echo "$name, you are a minor."
fi
```

运行结果：
![e05e42c77f3d4c239fc01e574c02086d.png](https://tu.2644536256.date/file/blog/wengzhang/1779546454433_e05e42c77f3d4c239fc01e574c02086d.png)

#### 总结

| 命令选项 | 说明 | 示例 |
| --- | --- | --- |
| `read` | 读取用户输入并赋值给变量 | `read name` |
| `-p` | 显示提示信息 | `read -p "Enter name: " name` |
| `-t` | 设置超时时间（秒） | `read -t 5 -p "Enter name: " name` |
| `-s` | 隐藏输入内容 | `read -sp "Enter password: " pwd` |
| `-n` | 只读取一个字符 | `read -n 1 -p "Continue? " choice` |
| `IFS` | 设置输入分隔符 | `IFS=',' read name age` |

通过 `read` 命令，你可以轻松地获取用户的输入，并根据输入的内容做出相应的处理，提升脚本的交互性和灵活性。

## 七、算术运算

在 Shell 脚本中，算术运算是常见的需求，可以用来进行基本的数学计算（如加、减、乘、除、取余等）。Shell 提供了几种方法来进行算术运算。

### 1、 使用 `expr` 进行算术运算

`expr` 是一个用于计算表达式的命令，它可以用于执行加法、减法、乘法、除法、取余等运算。注意，`expr` 必须在运算符周围加上空格。

##### 1\. **加法**

```bash
#!/bin/bash
a=10
b=20
sum=$(expr $a + $b)
echo "Sum: $sum"
```

输出：

```cobol
Sum: 30
```

##### 2\. **减法**

```bash
#!/bin/bash
a=30
b=10
diff=$(expr $a - $b)
echo "Difference: $diff"
```

输出：

```vbnet
Difference: 20
```

##### 3\. **乘法**

```bash
#!/bin/bash
a=5
b=6
prod=$(expr $a \* $b)   # 注意乘法符号需要加反斜杠
echo "Product: $prod"
```

输出：

```vbnet
Product: 30
```

##### 4\. **除法**

```bash
#!/bin/bash
a=30
b=5
quotient=$(expr $a / $b)
echo "Quotient: $quotient"
```

输出：

```vbnet
Quotient: 6
```

##### 5\. **取余**

```bash
#!/bin/bash
a=10
b=3
remainder=$(expr $a % $b)
echo "Remainder: $remainder"
```

输出：

```cobol
Remainder: 1
```

### 2、 使用 `$(( ))` 进行算术运算

除了 `expr`，Shell 还支持使用 `$(( ))` 进行算术运算，这种方式更为简洁，也不需要在运算符两侧加空格。

##### 1\. **加法**

```bash
#!/bin/bash
a=10
b=20sum=$((a + b))
echo "Sum: $sum"
```

输出：

```cobol
Sum: 30
```

##### 2\. **减法**

```bash
#!/bin/bash
a=30
b=10
diff=$((a - b))
echo "Difference: $diff"
```

输出：

```vbnet
Difference: 20
```

##### 3\. **乘法**

```bash
#!/bin/bash
a=5
b=6prod=$((a * b))   # 乘法时不需要反斜杠
echo "Product: $prod"
```

输出：

```vbnet
Product: 30
```

##### 4\. **除法**

```bash
#!/bin/bash
a=30
b=5quotient=$((a / b))
echo "Quotient: $quotient"
```

输出：

```vbnet
Quotient: 6
```

##### 5\. **取余**

```bash
#!/bin/bash
a=10
b=3
remainder=$((a % b))
echo "Remainder: $remainder"
```

输出：

```cobol
Remainder: 1
```

### 3、使用 `let` 进行算术运算

`let` 是另一种进行算术运算的方式，它直接在 Shell 脚本中进行计算，而不需要使用 `$(( ))` 或 `expr`。

##### 1\. **加法**

```bash
#!/bin/bash
a=10
b=20
let sum=a+be
cho "Sum: $sum"
```

输出：

```cobol
Sum: 30
```

##### 2\. **减法**

```bash
#!/bin/bash
a=30
b=10
let diff=a-b
echo "Difference: $diff"
```

输出：

```vbnet
Difference: 20
```

##### 3\. **乘法**

```bash
#!/bin/bash
a=5
b=6
let prod=a*b
echo "Product: $prod"
```

输出：

```vbnet
Product: 30
```

##### 4\. **除法**

```bash
#!/bin/bash
a=30
b=5
let quotient=a/b
echo "Quotient: $quotient"
```

输出：

```vbnet
Quotient: 6
```

##### 5\. **取余**

```bash
#!/bin/bash
a=10
b=3
let remainder=a%b
echo "Remainder: $remainder"
```

输出：

```cobol
Remainder: 1
```

### 4 、自增和自减

Shell 还支持对变量进行自增和自减操作，使用 `++` 和 `--` 操作符。

##### 1\. **自增**

```bash
#!/bin/bash
a=5
((a++))
echo "After increment: $a"
```

输出：

```cobol
After increment: 6
```

##### 2\. **自减**

```bash
#!/bin/bash
a=5
((a--))
echo "After decrement: $a"
```

输出：

```cobol
After decrement: 4
```

### 完整代码：

```bash
#!/bin/bash
a=10
b=20
sum=$(expr $a + $b)
echo "Sum: $sum"
echo
a=30
b=10
diff=$(expr $a - $b)
echo "Difference: $diff"
echo
a=5
b=6
prod=$(expr $a \* $b)   # 注意乘法符号需要加反斜杠
echo "Product: $prod"
echo
a=30
b=5
quotient=$(expr $a / $b)
echo "Quotient: $quotient"
echo
a=10
b=3
remainder=$(expr $a % $b)
echo "Remainder: $remainder"
echo
a=10
b=20
sum=$((a + b))
echo "Sum: $sum"
echo
a=30
b=10
diff=$((a - b))
echo "Difference: $diff"
echo
a=5
b=6
prod=$((a * b))   # 乘法时不需要反斜杠
echo "Product: $prod"
echo
a=30
b=5
quotient=$((a / b))
echo "Quotient: $quotient"
echo
a=10
b=3
remainder=$((a % b))
echo "Remainder: $remainder"
echo
a=10
b=20
let sum=a+b
echo "Sum: $sum"
echo
a=30
b=10
let diff=a-b
echo "Difference: $diff"
echo
a=5
b=6
let prod=a*b
echo "Product: $prod"
echo
a=30
b=5
let quotient=a/b
echo "Quotient: $quotient"
a=10
b=3
let remainder=a%b
echo "Remainder: $remainder"
echo
a=5
((a++))
echo "After increment: $a"
echo
a=5
((a--))
echo "After decrement: $a"
echo
运行项目并下载源码
bash

```

运行结果：

![43cff62bd6124ceba4ee7e9690306197.png](https://tu.2644536256.date/file/blog/wengzhang/1779546854514_43cff62bd6124ceba4ee7e9690306197.png)

### 5、小结

| 运算符 | 说明 | 示例 |
| --- | --- | --- |
| `+` | 加法 | `sum=$((a + b))` |
| `-` | 减法 | `diff=$((a - b))` |
| `*` | 乘法 | `prod=$((a * b))` |
| `/` | 除法 | `quotient=$((a / b))` |
| `%` | 取余 | `remainder=$((a % b))` |
| `++` | 自增 | `((a++))` |
| `--` | 自减 | `((a--))` |
| `expr` | 通过 `expr` 进行计算 | `expr $a + $b` |

* * *

**以上命令只能用于整数，不支持浮点数**

### `6、bc` 命令：功能强大的计算器工具

在 Shell 中，如果需要进行 **浮点数运算** 或者更复杂的数学表达式，`bc` 是非常实用的工具。`bc` 是 Linux 中内建的 **任意精度计算器语言（basic calculator）**，支持变量、函数和控制结构。

##### 基本语法

```bash
echo "表达式" | bc
```

![a517db67287e4a73b8fe7182494b729d.png](https://tu.2644536256.date/file/blog/wengzhang/1779546880634_a517db67287e4a73b8fe7182494b729d.png)

例如：

```bash
echo "3 + 5" | bc         # 输出 8
echo "scale=2; 3.5 / 2" | bc  # 输出 1.75，保留两位小数运行项目并下载源码
```

#####  示例：基本运算

```bash
#!/bin/bash
 
a=3.5
b=1.2
 
sum=$(echo "$a + $b" | bc)
echo "sum = $sum"
 
sub=$(echo "$a - $b" | bc)
echo "sub = $sub"
 
mul=$(echo "$a * $b" | bc)
echo "mul = $mul"
 
div=$(echo "scale=3; $a / $b" | bc)
echo "div = $div"
```

输出：

```bash
sum = 4.7
sub = 2.3
mul = 4.2
div = 2.916
```

![4ac555e8af3a47ab802e61404f38d2a4.png](https://tu.2644536256.date/file/blog/wengzhang/1779546961194_4ac555e8af3a47ab802e61404f38d2a4.png)

#####  scale 的含义

`scale` 用来设置小数点后保留的位数：

```bash
echo "scale=3; 10 / 3" | bc   # 输出 3.333
```

如果不设置 `scale`，默认结果为整数部分。

好的，下面是你博客中关于 `bc` 计算器中常用的几个设置参数（`scale`、`ibase`、`obase`）的详细说明内容，可以作为附加补充部分放在 “bc 命令” 小节之后，逻辑清晰、排版规范：

* * *

####  `scale` / `ibase` / `obase` 用法详解

`bc` 中支持设置以下三个控制变量，用于精度与进制转换：

* * *

#####  `scale`：小数点后保留位数

+   作用：设置小数点后保留几位精度（仅对除法等有意义）。
    
+   语法：`scale=数字`
    

示例：

```php
echo "scale=2; 5 / 3" | bc       # 输出：1.66
echo "scale=5; 1.234 / 3" | bc   # 输出：0.41133
```

`scale` 默认值为 `0`，所以如果不设置，`bc` 默认只输出整数部分！

* * *

##### `sibase`：输入数值的进制（Input Base）

+   作用：指定你输入的数字是几进制。
    
+   默认：`ibase=10`
    
+   常与 `obase` 搭配使用实现 **进制转换**。
    

示例：十六进制转十进制

```bash
echo "ibase=16; A + 1" | bc   # 输出：11（即十进制）
```

注意：**`ibase` 要在 `obase` 之前设置！** 因为设置 `ibase` 后，后面所有数值都会以该进制解析。

示例：进制转换（十进制转二进制）

```bash
echo "obase=2; 10" | bc      # 输出：1010（二进制）
```

* * *

#####  `obase`：输出数值的进制（Output Base）

+   作用：设置计算结果的输出进制。
    
+   默认：`obase=10`
    

示例：将十进制 100 转换为十六进制

```bash
echo "obase=16; 100" | bc    # 输出：64
```

* * *

##### 注意事项

+   设置顺序 matters：
    
    +   `ibase` **一定要在** `obase` **前设置**
        
    +   因为当 `ibase` 被设置为非 10 后，后续数字（包括 obase 的值）也将按新进制解析！
        

错误示例：

```bash
echo "ibase=16; obase=10; A" | bc    # 错误：obase 会被当成十六进制解释
```

正确示例：

```bash
echo "obase=10; ibase=16; A" | bc    # 输出 10运行项目并下载源码bash
```

* * *

#### 小结表格

| 参数 | 说明 | 默认值 | 示例 |
| --- | --- | --- | --- |
| `scale` | 小数精度控制 | 0 | `scale=3; 10/3` → `3.333` |
| `ibase` | 输入数字的进制（Input Base） | 10 | `ibase=2; 1100` → `12` |
| `obase` | 输出结果的进制（Output Base） | 10 | `obase=2; 12` → `1100` |

* * *

如果你希望我把这些内容连同前面章节统一整理成一篇完整的 Shell 博客结构（比如 `.md` 格式），我可以直接帮你生成！你想整理成一个 Markdown 文件吗？

##### 进阶功能：使用 `bc -l`

加上 `-l` 参数可以引入 `math` 库，支持 `sine`, `cosine`, `sqrt()` 等函数：

```bash
echo "scale=4; s(1.0)" | bc -l      # 计算 sin(1.0)
echo "scale=4; sqrt(2)" | bc -l     # 平方根
```

##### 多表达式计算

可以一次性执行多条命令：

```bash
echo "a=5; b=3; a*b + a/b" | bc -l
```

#####  交互模式（命令行里直接打 `bc`）

```bash
$ bc
scale=2
3.14 * 2
6.28
quit
```

#### 总结对比

| 特性 | `let` | `bc` |
| --- | --- | --- |
| 支持浮点数 | 不支持 |  支持 |
| 精度控制 | 不支持 | `scale=n` 控制 |
| 使用方式 | Shell 内建 | 管道传入表达式 |
| 功能扩展性 | 基本运算 | 支持复杂表达式和逻辑 |

* * *

如果你在写 Shell 脚本时只处理整数，`let` 足够了；  
但如果涉及到**浮点数**、**精度计算**或者数学函数，推荐使用 `bc`。

## 八、条件判断与流程控制

Shell 脚本中的条件判断和流程控制用于根据不同的条件执行不同的命令或代码块。在实际编写脚本时，我们经常需要用到 `if` 判断语句、`case` 语句、`for` 循环、`while` 循环等结构来控制程序的执行流程。

### 1、`if` 判断语句

`if` 语句是用来根据条件是否成立来决定是否执行某个代码块。它的基本语法结构如下：

```bash
if condition
then
    command1
    command2    
    ...
elif condition2
then
    command3
else
    command4
fi
```

+   `if`：用来测试一个条件表达式，若条件为真（0），则执行 `then` 后面的代码块。
    
+   `elif`：可选，用来判断另一个条件，若为真则执行相应代码。
    
+   `else`：可选，若前面的条件都不成立，则执行 `else` 后面的代码块。
    

###### 1\. **基本用法**

```bash
#!/bin/bash
a=10
if [ $a -gt 5 ]
then
    echo "$a is greater than 5"
else
    echo "$a is not greater than 5"
fi
```

输出：

```bash
10 is greater than 5
```

##### 2\. **多个条件判断**

```bash
#!/bin/bash
a=10
b=20
if [ $a -gt $b ]
then
    echo "$a is greater than $b"
elif [ $a -eq $b ]
then
    echo "$a is equal to $b"
else
    echo "$a is less than $b"

```

输出：

```bash
10 is less than 20
```

##### 条件判断符号

+   `-eq`：等于
    
+   `-ne`：不等于
    
+   `-gt`：大于
    
+   `-lt`：小于
    
+   `-ge`：大于等于
    
+   `-le`：小于等于
    
+   `-z`：字符串为空
    
+   `-n`：字符串非空
    

![bb9376a9b8c54899b12606b677868769.png](https://tu.2644536256.date/file/blog/wengzhang/1779547179833_bb9376a9b8c54899b12606b677868769.png)

![cdaca6957c7d49eeb99ee059d7ca63cb.png](https://tu.2644536256.date/file/blog/wengzhang/1779547192158_cdaca6957c7d49eeb99ee059d7ca63cb.png)

### `2、test` 和 `[ ]` 语法

在 Shell 中，`test` 和 `[` 都用于判断条件，它们的功能相同，可以互换使用。

```bash
#!/bin/bash
a=10
if test $a -gt 5
then
    echo "$a is greater than 5"
fi
```

或者

```bash
#!/bin/bash
a=10
if [ $a -gt 5 ]
then
    echo "$a is greater than 5"
fi
```

![8a75cc00490445d4ac13f2d9598f2459.png](https://tu.2644536256.date/file/blog/wengzhang/1779547269255_8a75cc00490445d4ac13f2d9598f2459.png)

![9cc39b6627cb4cf1b5fb2237a1ccae87.png](https://tu.2644536256.date/file/blog/wengzhang/1779547305533_9cc39b6627cb4cf1b5fb2237a1ccae87.png)

### 3、 `case` 结构

`case` 语句用于多重条件判断，类似于其他编程语言中的 `switch` 语句。它根据变量的值匹配不同的模式并执行相应的代码块。

```bash

#!/bin/bash
echo "Enter a number between 1 and 3"
read num
 
case $num in
    1)
        echo "You chose number 1"
        ;;
    2)
        echo "You chose number 2"
        ;;
    3)
        echo "You chose number 3"
        ;;
    *)
        echo "Invalid number"
        ;;
esac
```

**解释：**

+   `case` 后跟要判断的变量 `$num`。
    
+   每个条件后用 `)` 来进行匹配。
    
+   `;;` 表示匹配完成后的结束。
    
+   `*` 是通配符，表示其他情况，即 "默认" 条件。
    

### 4、 逻辑运算符

在 Shell 中，你还可以使用逻辑运算符来组合多个条件。

##### 1\. **AND（与）运算符 `&&`**

当多个条件都满足时，使用 `&&` 来连接。例如，`command1 && command2` 表示当 `command1` 执行成功时，才执行 `command2`。

```bash

#!/bin/bash
a=10
b=5
if [ $a -gt $b ] && [ $b -gt 0 ]
then
    echo "$a is greater than $b and $b is positive"
fi
```

##### 2\. **OR（或）运算符 `||`**

当至少一个条件满足时，使用 `||` 来连接。例如，`command1 || command2` 表示当 `command1` 执行失败时，才执行 `command2`。

```bash
#!/bin/bash
a=10
b=15
if [ $a -gt $b ] || [ $b -gt 0 ]
then
    echo "At least one condition is true"
fi
```

##### 3\. **非运算符 `!`**

用来否定一个条件的判断。

```bash
#!/bin/bash
a=10
if ! [ $a -lt 5 ]
then
    echo "$a is not less than 5"
fi
```

完整代码：

```bash

#!/bin/bash
a=10
if [ $a -gt 5 ]
then
    echo "$a is greater than 5"
else
    echo "$a is not greater than 5"
fi
echo
#!/bin/bash
a=10
b=20
if [ $a -gt $b ]
then
    echo "$a is greater than $b"
elif [ $a -eq $b ]
then
    echo "$a is equal to $b"
else
    echo "$a is less than $b"
fi
echo
a=10
if test $a -gt 5
then
    echo "$a is greater than 5"
fi
echo
echo "Enter a number between 1 and 3"
read num
 
case $num in
    1)
        echo "You chose number 1"
        ;;
    2)
        echo "You chose number 2"
        ;;
    3)
        echo "You chose number 3"
        ;;
    *)
        echo "Invalid number"
        ;;
esac
a=10
b=5
if [ $a -gt $b ] && [ $b -gt 0 ]
then
    echo "$a is greater than $b and $b is positive"
fi
echo
a=10
b=15
if [ $a -gt $b ] || [ $b -gt 0 ]
then
    echo "At least one condition is true"
fi
echo
a=10
if ! [ $a -lt 5 ]
then
    echo "$a is not less than 5"
fi
echo

```

运行结果： 

![ff969507c06b42599ff46fb788d3e918.png](https://tu.2644536256.date/file/blog/wengzhang/1779547361459_ff969507c06b42599ff46fb788d3e918.png)

## 九、循环结构

循环结构是编程语言中的一种基本控制结构，允许程序在特定条件下重复执行某一段代码。在 Shell 脚本中，常用的循环结构包括 `for` 循环、`while` 循环和 `until` 循环，它们用于不同场景下的重复任务。下面详细介绍这三种循环结构。

* * *

### 1、`for` 循环

`for` 循环用于遍历一系列值或执行一定次数的操作。Shell 中的 `for` 循环有两种常见的使用方式：遍历列表和基于计数的循环。

###### 1\. **遍历列表**

```bash
#!/bin/bash
# 使用for遍历一个列表
for i in 1 2 3 4 5
do
    echo "Iteration: $i"
done
```

输出：

```vbnet
Iteration: 1
Iteration: 2
Iteration: 3
Iteration: 4
Iteration: 5
```

###### 2\. **遍历文件夹中的文件**

你还可以使用 `for` 循环遍历文件夹中的文件：

```bash
#!/bin/bash
for file in /path/to/directory/*
do
    echo "File: $file"
done
```

###### 3\. **基于计数的循环**

如果你知道循环的次数，可以使用 `for` 循环进行计数：

```bash
#!/bin/bash
for i in {1..5}
do
    echo "Iteration: $i"
done
```

输出：

```vbnet
Iteration: 1
Iteration: 2
Iteration: 3
Iteration: 4
Iteration: 5
```

你还可以使用 `for` 进行更灵活的计数，例如步长控制：

```bash
#!/bin/bash
for i in {1..10..2}
do
    echo "Iteration: $i"
done
```

输出：

```bash
Iteration: 1
Iteration: 3
Iteration: 5
Iteration: 7
Iteration: 9
```

### `2、while` 循环

`while` 循环是一种条件循环，当条件为真时，它会重复执行某段代码。通常用于你不确定循环次数，但能判断何时停止循环的场景。

###### 1\. **基本用法**

```bash
#!/bin/bash
# 使用while循环，循环直到条件为假
i=1
while [ $i -le 5 ]
do
    echo "Iteration: $i"
    ((i++))  # 递增
done
```

输出：

```vbnet
Iteration: 1
Iteration: 2
Iteration: 3
Iteration: 4
Iteration: 5
```

###### 2\. **使用 `read` 控制 `while` 循环**

你还可以使用 `read` 来控制 `while` 循环，直到用户输入特定的值时才停止循环：

```bash
#!/bin/bash
# 使用while循环直到用户输入 'quit'
while true
do
    read -p "Enter a command (type 'quit' to exit): " command
    if [ "$command" == "quit" ]
    then
        echo "Exiting..."
        break
    fi
    echo "You entered: $command"
done
```

### 3、 `until` 循环

`until` 循环与 `while` 循环相反，`until` 在条件为 **假** 时执行，直到条件变为 **真** 才停止循环。

###### 1\. **基本用法**

```bash
#!/bin/bash
# 使用until循环，直到条件为真时才停止
i=1
until [ $i -gt 5 ]
do
    echo "Iteration: $i"
    ((i++))  # 递增
done
```

输出：

```bash
Iteration: 1
Iteration: 2
Iteration: 3
Iteration: 4
Iteration: 5
```

与 `while` 循环的不同之处在于，`until` 循环当条件为 **假** 时执行，当条件变为 **真** 时退出。

### 4、 `break` 和 `continue` 控制循环

在循环中，有时我们需要提前跳出循环或跳过当前的迭代。`break` 和 `continue` 用于这种场景。

##### 1\. **`break` 语句**

`break` 用于退出循环结构（无论条件是否成立），它会立即终止当前的循环。

```bash
#!/bin/bash
# 使用break提前退出循环
for i in 1 2 3 4 5
do
    if [ $i -eq 3 ]
    then
        echo "Breaking the loop at i=$i"
        break
    fi
    echo "Iteration: $i"
done
```

输出：

```bash
Iteration: 1
Iteration: 2
Breaking the loop at i=3
```

##### 2\. **`continue` 语句**

`continue` 用于跳过当前循环中的其余部分，并立即开始下一次循环迭代。

```bash
#!/bin/bash
# 使用continue跳过当前迭代
for i in 1 2 3 4 5
do
    if [ $i -eq 3 ]
    then
        echo "Skipping the loop at i=$i"
        continue
    fi
    echo "Iteration: $i"
done
```

输出：

```cobol
Iteration: 1
Iteration: 2
Skipping the loop at i=3
Iteration: 4
Iteration: 5
```

在上面的例子中，`continue` 会跳过数字 3 的输出，继续进行后续的迭代。

### 5、小结

| 结构 | 语法 | 说明 |
| --- | --- | --- |
| `for` | `for var in ... do ... done` | 循环遍历一系列值或执行一定次数的操作 |
| `while` | `while condition do ... done` | 条件为真时执行代码块 |
| `until` | `until condition do ... done` | 条件为假时执行代码块 |
| `break` | `break` | 立即退出循环 |
| `continue` | `continue` | 跳过当前迭代，继续下一次循环 |

这些循环结构可以帮助你在 Shell 脚本中实现复杂的逻辑处理，尤其是在需要处理大量数据或反复执行某个任务时非常有用。掌握这些循环结构，你将能够编写更高效、灵活的 Shell 脚本。

完整代码：

```bash
#!/bin/bash
# 使用for遍历一个列表
for i in 1 2 3 4 5
do
    echo "Iteration: $i"
done
echo
for i in {1..10..2}
do
    echo "Iteration: $i"
done
echo
# 使用while循环，循环直到条件为假
i=1
while [ $i -le 5 ]
do
    echo "Iteration: $i"
    ((i++))  # 递增
done
echo
# 使用while循环直到用户输入 'quit'
while true
do
    read -p "Enter a command (type 'quit' to exit): " command
    if [ "$command" == "quit" ]
    then
        echo "Exiting..."
        break
    fi
    echo "You entered: $command"
done
echo
# 使用until循环，直到条件为真时才停止
i=1
until [ $i -gt 5 ]
do
    echo "Iteration: $i"
    ((i++))  # 递增
done
echo
# 使用break提前退出循环
for i in 1 2 3 4 5
do
    if [ $i -eq 3 ]
    then
        echo "Breaking the loop at i=$i"
        break
    fi
    echo "Iteration: $i"
done
echo
# 使用continue跳过当前迭代
for i in 1 2 3 4 5
do
    if [ $i -eq 3 ]
    then
        echo "Skipping the loop at i=$i"
        continue
    fi
    echo "Iteration: $i"
done

```

运行结果：

 ![1d7838fe2dc347aa8e5c16d3fc62c686.png](https://tu.2644536256.date/file/blog/wengzhang/1779547560695_1d7838fe2dc347aa8e5c16d3fc62c686.png)

## 十、函数定义与调用

在 Shell 脚本中，函数（Function）是一段可重复执行的代码块，主要用于组织结构、提高代码复用性、减少重复编写。

### 1、函数的定义

Shell 中函数的定义有两种常见写法：

```bash
# 写法一（推荐）
function_name() {
    命令序列
}
 
# 写法二（等价）
function function_name {
    命令序列
}
```

### 2、函数的调用

定义好函数后，只需要使用函数名就可以调用该函数：

```bash
hello() {
    echo "Hello, Shell!"
}
 
# 调用函数
hello
```

输出：

```undefined
Hello, Shell!
```

###  3、带参数的函数

Shell 函数可以像脚本一样接收参数，通过 `$1`, `$2`... 表示第 1、第 2 个参数，`$#` 表示参数个数，`$*` 表示所有参数。

```bash
sum() {
    echo "第一个参数: $1"
    echo "第二个参数: $2"
    echo "参数个数: $#"
    echo "所有参数: $*"
}

sum 10 20
```

输出：

```bash
第一个参数: 10
第二个参数: 20
参数个数: 2
所有参数: 10 20
```

### 4、函数的返回值

Shell 函数默认的返回值是函数中最后一条命令的返回码（0 表示成功）。你也可以用 `return` 指定返回 0~255 的整数值，并通过 `$?` 获取。

```bash

add() {
    return $(($1 + $2))
}
 
add 3 4
result=$?
echo "结果是: $result"
```

输出：

```cobol
结果是: 7
```

> ⚠️ 注意：`return` 只能返回整数值，如果你想返回字符串或其他复杂结果，可以通过全局变量或命令替换返回。

### 5、函数返回字符串的方法（使用命令替换）

```bash
greet() {
    local name=$1
    echo "Hi, $name!"
}
 
msg=$(greet "Tom")
echo "$msg"
```

输出：

```bash
Hi, Tom!
```

### 6、函数作用域

Shell 中变量默认是全局的。为了避免变量冲突，可以使用 `local` 定义局部变量（只能在函数内部使用）。

```bash
demo() {
    local msg="局部变量"
    echo "$msg"
}
 
demo
# echo $msg  # 报错，变量已出作用域
```

完整代码：

```bash
#!/bin/bash
hello() {
    echo "Hello, Shell!"
}
 
# 调用函数
hello
echo
sum() {
    echo "第一个参数: $1"
    echo "第二个参数: $2"
    echo "参数个数: $#"
    echo "所有参数: $*"
}
 
sum 10 20
echo
add() {
    return $(($1 + $2))
}
 
add 3 4
result=$?
echo "结果是: $result"
echo
greet() {
    local name=$1
    echo "Hi, $name!"
}
 
msg=$(greet "Tom")
echo "$msg"
echo
demo() {
    local msg="局部变量"
    echo "$msg"
}
 
demo
# echo $msg  # 报错，变量已出作用域
echo
 
 
 
```

运行结果：

![2600acaff967455db1e9d2b134c70ed2.png](https://tu.2644536256.date/file/blog/wengzhang/1779547684202_2600acaff967455db1e9d2b134c70ed2.png)

### 7、小结

| 特性 | 说明 |
| --- | --- |
| 函数定义 | `function_name() {}` 或 `function function_name {}` |
| 参数获取 | `$1`, `$2`, ..., `$#`, `$*`, `$@` |
| 返回值（整型） | `return 数值`，通过 `$?` 获取 |
| 返回值（字符串） | 用 `echo` 输出 + 命令替换接收 |
| 局部变量 | 使用 `local` 定义 |

### 十一、项目实践与总结：开机自启 + 综合示例脚本

在完成了对 Shell 基础语法、命令使用、变量类型、用户输入、流程控制、函数调用等知识的学习后，最后用一个**开机自启任务**+一个**完整综合示例脚本**来结束。

#### 开机自启任务（运行 `~/myjob/pi5/yolo.py`）

如果你有一个 Python 程序希望开机自动执行，比如运行摄像头识别或嵌入式项目中用到的 YOLO 模型，可以使用以下 Shell 脚本和方法实现：

##### 方法一：通过 `crontab` 实现

```undefined
crontab -e
```

添加如下行（表示开机启动执行脚本）：

```cobol
@reboot /bin/bash /home/pi/myjob/pi5/start_yolo.sh
```

然后你可以编写 `start_yolo.sh` 脚本如下：

```bash
#!/bin/bash
# 开机运行 YOLO 脚本
cd ~/myjob/pi5/
python3 yolo.py > yolo.log 2>&1 &
```

别忘了给这个脚本添加执行权限：

```cobol
chmod +x ~/myjob/pi5/start_yolo.sh
```

* * *

#### 综合 Shell 脚本示例：`demo_all.sh`

```bash
#!/bin/bash
# Shell 综合示例脚本
 
# 注释使用
:<<!
这是多行注释
学习 Shell 真开心！
!
 
# 输出与变量
echo "欢迎使用 Shell 脚本教程"
name="Shell达人"
echo "你好，$name"
 
# 函数定义与返回值
sum() {
    local a=$1
    local b=$2
    echo "函数参数：a=$a, b=$b"
    return $((a + b))
}
sum 3 5
result=$?
echo "sum 函数的返回值是 $result"
 
# 用户输入
read -p "请输入你的年龄：" age
echo "你的年龄是 $age"
 
# 算术运算
x=10
y=3
echo "$x + $y = $((x + y))"
echo "$x * $y = `expr $x \* $y`"
 
# 条件判断
if [[ $age -ge 18 ]]; then
    echo "成年人"
else
    echo "未成年人"
fi
 
# case 语句
read -p "请输入星期数字 (1-7)：" day
case $day in
1) echo "星期一" ;;
2) echo "星期二" ;;
3) echo "星期三" ;;
*) echo "其他" ;;
esac
 
# for 循环
echo "打印 1 到 5 的数字："
for i in {1..5}; do
    echo "$i"
done
 
# while 循环
count=0
while [[ $count -lt 3 ]]; do
    echo "count=$count"
    ((count++))
done
 
# 变量类型与作用域
declare -i score=90
declare -r school="Shell大学"
echo "score=$score, school=$school"
 
# 特殊变量
echo "本脚本名称：$0"
echo "第一个参数：$1"
echo "所有参数：$*"
echo "参数个数：$#"
 
# 结束语
echo "脚本执行完毕，感谢阅读！"
exit 0
```

>  可使用 `chmod +x demo_all.sh && ./demo_all.sh` 来运行这个脚本

![62bc9cf352b04edc877b3dbcf00d0e9e.png](https://tu.2644536256.date/file/blog/wengzhang/1779547709766_62bc9cf352b04edc877b3dbcf00d0e9e.png)

* * *

### 总结

Shell 脚本是 Linux 世界中最重要的自动化工具之一。通过它，可以：

+   快速执行大量重复命令
    
+   控制程序逻辑和流程
    
+   构建自动化系统任务
    
+   提高系统运维和开发效率
    

本篇博客从基础语法出发，逐步介绍了 Shell 的常用命令、变量、输入输出、流程控制、函数封装以及开机自启脚本设计等内容，希望你能将所学应用到实际项目中，写出属于你自己的自动化脚本工具！

参考：

https://www.bilibili.com/video/BV17T4y1F7WV?vd\_source=98bed58398f58cc195df30c92a236213