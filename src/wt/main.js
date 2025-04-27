import  { Worker } from 'worker_threads';
import  os from 'os';
import  path from 'node:path';

const performCalculations = async () => {
    // Get the number of CPU cores
    const numCores = os.cpus().length;
    
    const workerPromises = [];
    
    // Create and start workers
    for (let i = 0; i < numCores; i++) {
        const workerNumber = 10 + i; // Start from 10 and increment
        
        // Create a promise for this worker's execution
        const workerPromise = new Promise((resolve) => {
           
            const workerPath = path.resolve('src/wt/worker.js');
            console.log(`Starting worker with input ${workerNumber}, path: ${workerPath}`);
            
            const worker = new Worker(workerPath, {
                workerData: workerNumber
            });
            
            // Handle message from worker
            worker.on('message', (result) => {
                if (result && result.error) {
                    resolve({
                        status: 'error',
                        data: null
                    });
                } else {
                    resolve({
                        status: 'resolved',
                        data: result
                    });
                }
            });
            
            // Handle errors
            worker.on('error', (error) => {
                console.error(`Worker error: ${error}`);
                resolve({
                    status: 'error',
                    data: null
                });
            });
            
            // Handle worker exit with error
            worker.on('exit', (code) => {
                if (code !== 0) {
                    console.error(`Worker exited with code ${code}`);
                    resolve({
                        status: 'error',
                        data: null
                    });
                }
            });
        });
        
        workerPromises.push(workerPromise);
    }
    
    // Wait for all workers to complete
    const results = await Promise.all(workerPromises);
    console.log(results);
    
    return results;
};

await performCalculations();