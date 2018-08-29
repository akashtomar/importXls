import sys, pip, json


def row_to_dict(h, row):
    sub_dict = {}
    for i, cell in enumerate(row):
        sub_dict[h[i]] = cell.value
    return sub_dict



def main():
    wb = openpyxl.load_workbook(sys.argv[1])
    #sheetnames 
    sheet = wb["Sheet 1"]
    data = []
    headers = []    
    for i, row in enumerate(sheet.iter_rows()):
        if i == 0:
            for cell in row:
                headers.append(cell.value)
        else:
            data.append(row_to_dict(headers, row))
        

    print(data)

if __name__ == "__main__":
    # import openpyxl
    # main()
    try:
        import openpyxl
        main()
    except:
        print('library not present!')
    

