const { Client } = require("basic-ftp");
const { Readable, PassThrough } = require('stream');
const { promisify } = require('util');
const sleep = promisify(setTimeout);
require('dotenv').config();

async function connectToFtp() {
    const client = new Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            // secure: true
        });
        console.log("Conectado ao servidor FTP!");
        return client;
    } catch (err) {
        console.error("Erro ao conectar ao servidor FTP:", err);
        client.close();
    }
}

async function uploadFiles(fileBuffers, remotePaths) {
    const client = await connectToFtp();

    if (client) {
        try {
            for (let i = 0; i < fileBuffers.length; i++) {
                const readableStream = new Readable();
                readableStream._read = () => { };
                readableStream.push(fileBuffers[i]);
                readableStream.push(null);

                client.ftp.timeout = 0;
                console.log(`Iniciando upload do arquivo para ${remotePaths[i]}...`);

                await client.uploadFrom(readableStream, remotePaths[i]);
                console.log(`Arquivo enviado para ${remotePaths[i]} com sucesso!`);
            }
        } catch (err) {
            console.error("Erro ao enviar os arquivos:", err);
        } finally {
            client.close();
            console.log("Conexão FTP fechada.");
        }
    }
}

async function ensureDir(remotePath) {
    const client = await connectToFtp();

    if (client) {
        try {
            await client.ensureDir(remotePath);
            console.log(`Diretorio ${remotePath} criado/verificado com sucesso!`);
            await sleep(1000);
        } catch (err) {
            console.error("Erro ao criar/verificar o diretorio:", err);
        } finally {
            client.close();
        }
    }
}

async function deleteFiles(remotePaths) {
    const client = await connectToFtp();

    if (client) {
        try {
            for (const remotePath of remotePaths) {
                await client.remove(remotePath);
                console.log(`Arquivo ${remotePath} deletado com sucesso!`);
            }
        } catch (err) {
            console.error("Erro ao deletar os arquivos:", err);
        } finally {
            client.close();
        }
    }
}

async function renameFiles(oldPaths, newPaths) {
    const client = await connectToFtp();

    if (client) {
        try {
            for (let i = 0; i < oldPaths.length; i++) {
                await client.rename(oldPaths[i], newPaths[i]);
                console.log(`Arquivo renomeado de ${oldPaths[i]} para ${newPaths[i]} com sucesso!`);
            }
        } catch (err) {
            console.error(`Erro ao renomear os arquivos:`, err);
        } finally {
            client.close();
        }
    }
}

async function getFileStream(remotePath) {
    const client = await connectToFtp();

    if (client) {
        try {
            const passThrough = new PassThrough();
            client.downloadTo(passThrough, remotePath)
                .then(() => client.close())
                .catch(err => {
                    console.error(`Erro ao obter o arquivo ${remotePath}:`, err);
                    client.close();
                });
            return passThrough;
        } catch (err) {
            console.error(`Erro ao obter o arquivo ${remotePath}:`, err);
            client.close();
            return null;
        }
    }
}

async function deleteDir(remotePath) {
    const client = await connectToFtp();

    if (client) {
        try {
            await client.removeDir(remotePath);
            console.log(`Diretório ${remotePath} e seu conteúdo foram deletados com sucesso!`);
        } catch (err) {
            console.error(`Erro ao deletar o diretório ${remotePath}:`, err);
        } finally {
            client.close();
        }
    }
}

module.exports = { connectToFtp, uploadFiles, ensureDir, deleteFiles, renameFiles, getFileStream, deleteDir };