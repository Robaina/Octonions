# Multiply numbers of the Cayley-Dickson construction
import numpy as np


def conjugate(x):
    """
    Computes the conjugate
    """
    xstar = [-a for a in x]
    xstar[0] *= -1
    return xstar


def inverse(x):
    """
    Computes the multiplicative inverse
    """
    xstar = conjugate(x)
    xnorm = sum([a**2 for a in x])
    return [a / xnorm for a in xstar]


def vectorSum(x, y):
    """
    Computes the sum element-wise
    """
    return [a + b for a, b in zip(x, y)]


def CayleyDickson(x, y):
    """
    Computes the multiplication of the elements x, y
    of a Cayley-Dickson algebra
    """
    n = len(x)

    if n == 1:
        return x[0]*y[0]

    m = n // 2

    a, b = x[:m], x[m:]
    c, d = y[:m], y[m:]
    z = np.zeros(n)
    z[:m] = CayleyDickson(a, c) - CayleyDickson(conjugate(d), b)
    z[m:] = CayleyDickson(d, a) + CayleyDickson(b, conjugate(c))
    return z

print(CayleyDickson([0,1,0,0,0,0,0,0], [0,0,1,0,0,0,0,0]))
