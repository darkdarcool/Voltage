<p align = "center">
  <img src = "./images/logo.png" width = "250" height = "100">
</p>

# Voltage 

> Python optimizer


# Welcome

Welcome to Voltage!

Voltage a _powerful_ python optimizer/compiler that does: 

* Comment removal

By testing if comments can affect compile time, it was found that they _can_ slow down compile time if there are more than 5 in a program. So we remove single line comments. We do _not_ string multiline comments as they can contain copyright, and important notes

* Adds semicolons to each line 

This allows the compiler to easily parse your program faster!

* Rerouting built in functions in different ways to be faster!

Some functions in python are widly used and are difficult to avoid _not_ using. Voltage takes them and supercharges their speed!

* So much more to come!

Voltage is very _beta_ and _jank_, so please wait for featues to be added, and if your feature isn't currently in the process of being made, feel free to request one in the issues!

# Intro

Voltage is a that helps you write code in the latest and most modern ways and version of python, by compiling your version of python to the latest ways and techniques!

### In:

``` python
print("Hello, world!\n"); # Note: The \n is needed for the compiled sys!
```

### Out:

```python 
import sys;
sys.stdout.write("Hello, world!\n");
```


# Details

### Maintainers:

This is maintained by [@darkdarcool](https://github.com/darkdarcool)

### Help? 

Please open a discussion Q&A for questions about errors or problems.

### Contributing?

We will have a contributing guide soon!

