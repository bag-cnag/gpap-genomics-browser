
import csv
import os
import time
import requests
import DATA_POINTS


# Substring to obtain the correct name from mapping file.
def getExperimentName(fileNamePath):

    if type(fileNamePath) == str:
        head_tail = os.path.split(fileNamePath)
        if "bam" in head_tail[1] and "bai" not in head_tail[1] :
            name = head_tail[1].split('.')[0]
            return name
    else:
        return None


def mapping(filename):
    rowFile = None

    # CSV file containing the sample to EGA file name mapping
    # This is an private shared file between CNAG-CRG and EGA
    CSV_MAPPING = 'EGA FILE LIST'

    # open the file and find the corresponding EGA File

    with open(CSV_MAPPING, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            experimentName = getExperimentName(row["fileName"])
            if experimentName == filename:
               rowFile=row

    return rowFile



def getFile(experimentName, chrom, start, end):

    # URL to get the EGA Authorized token
    EGA_URL_TOKEN = ""

    # URL to get
    EGA_URL = ""

    start_time = time.time()

    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    # Payload to obtain the authorized token from EGA
    data = {"grant_type": "",
            "client_id": "",
            "scope": "",
            "client_secret": "",
            "username": "",
            "password": ""
            }

    # Request to obtain the authorized token from EGA

    r = requests.post(EGA_URL_TOKEN, headers=headers, data=data)
    reply = r.json()
    oauth_token = reply['access_token']

    if oauth_token:

        # File Information to collect the fileId to request in the payload
        files_info = mapping(experimentName)
        fileName_BAM = files_info["fileId"]

        # file id in EGA archive
        filename_bam = fileName_BAM
        chrom = str(chrom)
        start = int(start)
        end = int(end)

        # Prepare headers and request for genomics alignments data
        headers = {'authorization': 'Bearer ' + oauth_token}
        htsget_url = EGA_URL + filename_bam + "?referenceName=" + chrom + "&start=" + str(start) + "&end=" + str(end)

        if filename_bam is not None:
            print(filename_bam)
            try:
                response = requests.get(htsget_url, headers=headers, verify=False)
                final_t = time.time()
                tot = final_t - start_time
                if response.status_code == 200:
                     return {"success": True, "time": tot, "chrom": chrom}
                else:
                     print(response.content)
                     tot = final_t - start_time
                     return {"success": False, "time": tot, "chrom": chrom}
            except:
                return {"success": False}
    else:
        return {"success": False, "time": "Not authorized to access"}



def request_data(sample, folder, points, iterator):

    results = []

    name = sample + "_test" + str(iterator) + ".csv"

    f = open(folder + '/' + name, 'w', newline='')
    writer = csv.writer(f)

    for position in points:

        result = getFile(sample, position["chrom"], position["pos"], position["end"])
        if result["success"]:
            # write a row to the csv file
            results.append(result)
            writer.writerow([sample, position["chrom"], position["pos"], position["end"], result["time"], "Success"])
        else:
            results.append(result)
            writer.writerow([sample, position["chrom"], position["pos"], position["end"], result["time"], "Failed"])

    # close the file
    f.close()



# Python Script to run the serioes of test.

DATASET_1 = DATA_POINTS.dict_1
DATASET_2 = DATA_POINTS.dict_2

# samples that I want to retrieve in EGA. Provide RD-Connect ID.
sample_WES = ""
sample_WGS = ""


for iterator in range(0,3):
    request_data(sample_WES, "20bp_WES", DATASET_1, iterator)

for iterator in range(0,3):
    request_data(sample_WGS, "20bp_WGS", DATASET_1, iterator)

for iterator in range(0,3):
     request_data(sample_WES, "1kbp_WES", DATASET_2, iterator)

for iterator in range(0,3):
     request_data(sample_WGS, "1kbp_WGS", DATASET_2, iterator)

