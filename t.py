def accpet_all_kwag_arg(a, b, **kwags):
    print(f'{a=}')
    print(f'{b=}')
    print(kwags)
    for kwag in kwags:
        print(kwag, '-', kwags[kwag])


accpet_all_kwag_arg(1, 2, c=3, d=4)
