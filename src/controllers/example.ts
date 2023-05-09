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
        // console.log("exampleCheck rendered");
    }
    exampleCheckReqRes = (req: Request, res: Response) => {
        res.send("From Response - no route");
    }
    exampleCheckDashboardReqRes = (req: Request, res: Response) => {
        let file = req?.files?.file as UploadedFile;

        let base64 = file.data.toString("base64");

        // sending result - 1
        let writefilename = file.name.split(".")[0] + ".json";
        let pathdir = path.join(__dirname, '../public', writefilename);
        // if name specified we have to change 
        let jsonfiledata = JSON.stringify({ base64str: base64, sourcetype: file?.name?.split(".")[1] });
        fs.writeFile(pathdir, jsonfiledata, function (err) {

            if (err) {

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
                        message: `${writefilename} File uploaded`
                    }
                }));
            }

        });
    }
    decodeBase64Str = async (req: Request, res: Response) => {
        let base64str = req.body.decodebase64str;
        let destinationpath = req.body.destinationpath;
        let decodedstr = Buffer.from(base64str, "base64");
        // mime data
        const mimeInfo = await fileType.fromBuffer(Buffer.from(base64str, "base64"));

        let filetypeext = mimeInfo?.ext || req.body.filetype;
        console.log(mimeInfo);
        let writefilename = req.body.destinationpath;
        let filename = "file." + filetypeext;
        let pathdir = path.join(writefilename);

        fs.access(writefilename, fs.constants.F_OK, (err) => {

            // Create the file

            let filepath = path.join(writefilename, filename);

            if (err) {

                // Test the if the file exists again
                fs.access(pathdir, fs.constants.F_OK, (err) => {

                    if (err) {

                        fs.mkdir(path.join(destinationpath), (err) => {

                            if (err) {
                                res.status(200).send(JSON.stringify({
                                    data: {
                                        "message": `${filename}: ${err?.message}`
                                    }
                                }))
                                return console.error(err);
                            }
                            else {

                                // Create the file

                                let filepath = path.join(destinationpath, filename);

                                fs.writeFile(filepath, decodedstr, function (err) {

                                    if (err) {

                                        res.status(200).send(JSON.stringify({
                                            data: {
                                                "message": `${filename}: ${err?.message}`
                                            }
                                        }));
                                    }
                                    else {
                                        res.status(200).send(JSON.stringify({
                                            data: {
                                                "message": `${filename} File Created`
                                            }
                                        }));
                                    }

                                });
                            }
                        });
                    }
                    else {
                        res.status(200).send(JSON.stringify({
                            data: {
                                "message": `${filename} File Does Not Exist`
                            }
                        }));

                    }
                });
            }
            else {

                fs.writeFile(filepath, decodedstr, function (err) {
                    if (err) {
                        res.status(200).send(JSON.stringify({
                            data: {
                                "message": `${filename}: ${err?.message}`
                            }
                        }));
                    } else {
                        res.status(200).send(JSON.stringify({
                            data: {
                                "message": `${filename} File Created`
                            }
                        }));
                    }
                });

            }
        });

    }
    downloadFile = (req: Request, res: Response) => {

        let filename = req?.params?.fn;
        let pathdir = path.join(__dirname, '../public', filename);
        res.download(pathdir, filename, function (err) {
            if (err) {

                res.status(200).send(JSON.stringify({
                    data: {
                        "message": `${filename}: ${err?.message}`
                    }
                }))
            } else {
                res.status(200).send(JSON.stringify({
                    data: {
                        "message": `${filename} File Downloaded`
                    }
                }))
            }

        });


    }
};
export default new exampleClassCheck();