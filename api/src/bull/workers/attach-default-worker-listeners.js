const attachDefaultWorkerListeners = (worker) => {
  worker.on('active', (job) => {
    console.log(`Job ${job.id} is now active...`, `worker: ${worker.qualifiedName}`);
  });

  worker.on('closed', () => {
    console.log(`worker: ${worker.qualifiedName} is closed`);
  });

  worker.on('closing', (msg) => {
    console.log(`worker: ${worker.qualifiedName} is closing with msg: ${msg}`);
  });

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`, `worker: ${worker.qualifiedName}`);
  });

  worker.on('drained', () => {
    console.log(`worker: ${worker.qualifiedName} is drained`);
  });

  worker.on('error', (error) => {
    console.error(`Queue error: ${error}`, `worker: ${worker.qualifiedName}`);
  });

  worker.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed with error ${err}`, `worker: ${worker.qualifiedName}`);
  });

  worker.on('paused', () => {
    console.log(`worker: ${worker.qualifiedName} is drained`);
  });

  worker.on('progress', (job) => {
    console.log(`Job ${job.id} in progress`, `worker: ${worker.qualifiedName}`);
  });

  worker.on('ready', () => {
    console.log(`worker: ${worker.qualifiedName} is ready`);
  });

  worker.on('resumed', () => {
    console.log(`worker: ${worker.qualifiedName} is resumed`);
  });

  worker.on('waiting', (jobId) => {
    console.log(`Job ${jobId} is waiting...`, `worker: ${worker.qualifiedName}`);
  });

  worker.on('stalled', (job) => {
    console.log(`Job ${job.id} has stalled...`, `worker: ${worker.qualifiedName}`);
  });
};

module.exports = {
  attachDefaultWorkerListeners,
};
