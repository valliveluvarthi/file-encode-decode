import fetch from "node-fetch";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import fileSystem from "fs";
import fileType from "file-type";
import https from "https";
import mime from "mime";
import path from 'path';
import * as strtok3 from 'strtok3';
import fileTypeFromBuffer from 'file-type';


/**
 * Home page.
 * @route GET /
 */

class exampleClassCheck {
    exampleCheck = () => {
        console.log("exampleCheck rendered");
    }
    exampleCheckReqRes = (req: Request, res: Response) => {
        res.send("From Response - no route");
        console.log("exampleCheckReqRes rendered");
    }
    exampleCheckDashboardReqRes = (req: Request, res: Response) => {
        console.log("request", req?.files);
        let file = req?.files?.file as UploadedFile;
        console.log("29 file data", file?.data);
        let base64 = file.data.toString("base64");
        console.log(base64);
        // fs.writeFile(file.name, base64, { "encoding": "base64" }, function (err) {
        //     console.log('File created on react');
        // });
        // sending result - 1
        let writefilename = file.name.split(".")[0] + ".json";
        let pathdir = path.join(__dirname, '../public', writefilename);
        // if name specified we have to change 
        let jsonfiledata = JSON.stringify({ base64str: base64, sourcetype: file?.name?.split(".")[1] });
        fs.writeFile(pathdir, jsonfiledata, function (err) {
            console.log('File created on react');
            console.log("41 path dir", pathdir);
            if (err) {
                console.log("line 45", err);
                res.status(200).send(JSON.stringify({
                    data: {
                        message: err.message
                    }
                }));
            }
            else {
                res.status(200).send(JSON.stringify({
                    data: {
                        base64str: base64,
                        sourcetype: file?.name?.split(".")[1],
                        message: "File uploaded"
                    }
                }));
            }
            console.log("61 console");
        });
    }
    decodeBase64Str = async (req: Request, res: Response) => {
        let base64str = req.body.decodebase64str;
        let destinationpath = req.body.destinationpath || "E:/DecodedFilesCopy";
        let destinationfolderArr = destinationpath.split("/");
        let destinationfolder = destinationfolderArr[destinationfolderArr.length - 1];

        let decodedstr = Buffer.from(base64str, "base64");
        // mime data
        const mimeInfo = await fileType.fromBuffer(Buffer.from(base64str, "base64"));
        console.log(mimeInfo);
        let filetype = mimeInfo?.ext;
        let writefilename = req.body.destinationpath;
        let filename = "file." + filetype;
        let pathdir = path.join(writefilename);
        console.log(pathdir);
        fs.access(writefilename, fs.constants.F_OK, (err) => {
            console.log('\n> Checking if the file exists');
            // Create the file
            console.log('\nCreating the file');
            let filepath = path.join(writefilename, filename);
            console.log(filepath);
            fs.writeFile(filepath, decodedstr, function (err) {
                console.log('File created on react');
                res.status(200).send(JSON.stringify({
                    data: {
                        "message": "File created"
                    }
                }))
            });
            if (err) {
                console.error('File does not exist');

                // Test the if the file exists again
                fs.access(pathdir, fs.constants.F_OK, (err) => {
                    console.log('\n> Checking if the file exists');
                    if (err) {
                        console.log("no access");
                        fs.mkdir(path.join(destinationpath), (err) => {
                            console.log("destinationpath", destinationpath);
                            console.log("destinationfolder", destinationfolder);
                            if (err) {
                                res.status(200).send(JSON.stringify({
                                    data: {
                                        "message": err?.message
                                    }
                                }))
                                return console.error(err);
                            }
                            else {
                                console.log('Directory created successfully!');
                                // Create the file
                                console.log('\nCreating the file');
                                let filepath = path.join(destinationpath, filename);
                                console.log("98 file path", filepath);
                                fs.writeFile(filepath, decodedstr, function (err) {
                                    console.log('File created on react');
                                    if (err) {
                                        console.log("line 105", err);

                                        res.status(200).send(JSON.stringify({
                                            data: {
                                                "message": err?.message
                                            }
                                        }));
                                    }
                                    else {
                                        res.status(200).send(JSON.stringify({
                                            data: {
                                                "message": "File created"
                                            }
                                        }));
                                    }
                                    console.log("132 console");
                                });
                            }
                        });
                    }
                    else {
                        res.status(200).send(JSON.stringify({
                            data: {
                                "message": "File does exist"
                            }
                        }));
                        console.log('File does exist');
                    }
                });
            }
            else {
                res.status(200).send(JSON.stringify({
                    data: {
                        "message": "File does exist"
                    }
                }))
                console.log('File does exist');
            }
        });

        // take the input str - decdestr
        // decode it 
        //decoded str =  Buffer.from(base64).toString("base64");
        // str =- ? , get extension - make file
        // to get file name - to create a file - ?
        // fs.writeFile(writefilename, jsonfiledata, function (err) {
        //     console.log('File created on react');
        // });
        // for  different  folder - fs.access to place the file
        // if folder is not there - fs.mkdir() to create folder and place file 
        // now send this file 
        // success or error
    }
    downloadFile = (req: Request, res: Response) => {
        // let filename = req.body.filename || "balloons.json";
        let filename = req.params.fn;
        let pathdir = path.join(__dirname, '../public', filename);
        res.download(pathdir, filename, function (err) {
            if (err) {
                console.log("download err", err);
                res.status(200).send(JSON.stringify({
                    data: {
                        "message": err?.message
                    }
                }))
            }
        });

        // var filename1 = path.basename(filename);
        // var mimetype = mime.lookup(filename);

        // res.setHeader('Content-disposition', 'attachment; filename=' + filename1);
        // res.setHeader('Content-type', mimetype);
        // console.log(pathdir);


        // const readStream = fs.createReadStream(pathdir);
        // readStream
        //     .on('open', function () {
        //         // This just pipes the read stream to the response object (which goes to the client)
        //         readStream.pipe(res);
        //     })
        //     .on('end', function () {
        //         readStream.unpipe(res);
        //         console.log('All the data in the file has been read');
        //     })
        //     .on('close', function (err: any) {
        //         console.log('Stream has been Closed');
        //         console.log(err);
        //     });
    }
};
export default new exampleClassCheck();