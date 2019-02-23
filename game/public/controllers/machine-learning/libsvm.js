(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        exports['libsvm'] = factory();
    } else {
        root['libsvm'] = factory();
    }
})(typeof self !== 'undefined' ? self : this, function() {
    return /** ****/ (function(modules) { // webpackBootstrap
        /** ****/ 	// The module cache
        /** ****/ 	const installedModules = {};
        /** ****/
        /** ****/ 	// The require function
        /** ****/ 	function __webpack_require__(moduleId) {
            /** ****/
            /** ****/ 		// Check if module is in cache
            /** ****/ 		if (installedModules[moduleId]) {
                /** ****/ 			return installedModules[moduleId].exports;
                /** ****/}
            /** ****/ 		// Create a new module (and put it into the cache)
            /** ****/ 		const module = installedModules[moduleId] = {
                /** ****/ 			i: moduleId,
                /** ****/ 			l: false,
                /** ****/ 			exports: {},
                /** ****/ 		};
            /** ****/
            /** ****/ 		// Execute the module function
            /** ****/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /** ****/
            /** ****/ 		// Flag the module as loaded
            /** ****/ 		module.l = true;
            /** ****/
            /** ****/ 		// Return the exports of the module
            /** ****/ 		return module.exports;
            /** ****/}
        /** ****/
        /** ****/
        /** ****/ 	// expose the modules object (__webpack_modules__)
        /** ****/ 	__webpack_require__.m = modules;
        /** ****/
        /** ****/ 	// expose the module cache
        /** ****/ 	__webpack_require__.c = installedModules;
        /** ****/
        /** ****/ 	// define getter function for harmony exports
        /** ****/ 	__webpack_require__.d = function(exports, name, getter) {
            /** ****/ 		if (!__webpack_require__.o(exports, name)) {
                /** ****/ 			Object.defineProperty(exports, name, {
                    /** ****/ 				configurable: false,
                    /** ****/ 				enumerable: true,
                    /** ****/ 				get: getter,
                    /** ****/ 			});
                /** ****/}
            /** ****/};
        /** ****/
        /** ****/ 	// getDefaultExport function for compatibility with non-harmony modules
        /** ****/ 	__webpack_require__.n = function(module) {
            /** ****/ 		const getter = module && module.__esModule ?
            /** ****/ 			function getDefault() {
                    return module['default'];
                } :
            /** ****/ 			function getModuleExports() {
                    return module;
                };
            /** ****/ 		__webpack_require__.d(getter, 'a', getter);
            /** ****/ 		return getter;
            /** ****/};
        /** ****/
        /** ****/ 	// Object.prototype.hasOwnProperty.call
        /** ****/ 	__webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /** ****/
        /** ****/ 	// __webpack_public_path__
        /** ****/ 	__webpack_require__.p = '';
        /** ****/
        /** ****/ 	// Load entry module and return exports
        /** ****/ 	return __webpack_require__(__webpack_require__.s = 1);
        /** ****/ })
    /** **********************************************************************/
    /** ****/ ([
        /* 0 */
        /** */ (function(module, exports) {


            /** */}),
        /* 1 */
        /** */ (function(module, exports, __webpack_require__) {
            module.exports = __webpack_require__(2);
            /** */}),
        /* 2 */
        /** */ (function(module, exports, __webpack_require__) {
            'use strict';


            const loadSVM = __webpack_require__(3);
            const libsvm = __webpack_require__(5);

            module.exports = libsvm.load().then(() => loadSVM(libsvm));
            /** */}),
        /* 3 */
        /** */ (function(module, exports, __webpack_require__) {
            'use strict';


            module.exports = function(libsvm) {
                const util = __webpack_require__(4);

                /* eslint-disable camelcase */
                const predict_one = libsvm.cwrap('libsvm_predict_one', 'number', ['number', 'array', 'number']);
                const predict_one_probability = libsvm.cwrap('libsvm_predict_one_probability', 'number', ['number', 'array', 'number', 'number']);
                const add_instance = libsvm.cwrap('add_instance', null, ['number', 'array', 'number', 'number', 'number']);
                const create_svm_nodes = libsvm.cwrap('create_svm_nodes', 'number', ['number', 'number']);
                const train_problem = libsvm.cwrap('libsvm_train_problem', 'number', ['number', 'string']);
                const svm_get_nr_sv = libsvm.cwrap('svm_get_nr_sv', 'number', ['number']);
                const svm_get_nr_class = libsvm.cwrap('svm_get_nr_class', 'number', ['number']);
                const svm_get_sv_indices = libsvm.cwrap('svm_get_sv_indices', null, ['number', 'number']);
                const svm_get_labels = libsvm.cwrap('svm_get_labels', null, ['number', 'number']);
                const svm_free_model = libsvm.cwrap('svm_free_model', null, ['number']);
                const svm_cross_validation = libsvm.cwrap('libsvm_cross_validation', null, ['number', 'string', 'number', 'number']);
                const svm_get_svr_probability = libsvm.cwrap('svm_get_svr_probability', null, ['number']);
                const free_problem = libsvm.cwrap('free_problem', null, ['number']);
                const serialize_model = libsvm.cwrap('serialize_model', 'number', ['number']);
                const deserialize_model = libsvm.cwrap('deserialize_model', 'number', ['string']);

                /* eslint-enable camelcase */

                class SVM {
                    /**
         * @constructor
         * @param {object} options
         * @param {number} [options.type=SVM_TYPES.C_SVC] - Type of SVM to perform,
         * @param {number} [options.kernel=KERNEL_TYPES.RBF] - Kernel function,
         * @param {number} [options.degree=3] - Degree of polynomial, for polynomial kernel
         * @param {number} [options.gamma] -  Gamma parameter of the RBF, Polynomial and Sigmoid kernels. Default value is 1/num_features
         * @param {number} [options.coef0=0] - coef0 parameter for Polynomial and Sigmoid kernels
         * @param {number} [options.cost=1] - Cost parameter, for C SVC, Epsilon SVR and NU SVR
         * @param {number} [options.nu=0.5] - For NU SVC and NU SVR
         * @param {number} [options.epsilon=0.1] - For epsilon SVR
         * @param {number} [options.cacheSize=100] - Cache size in MB
         * @param {number} [options.tolerance=0.001] - Tolerance
         * @param {boolean} [options.shrinking=true] - Use shrinking euristics (faster),
         * @param {boolean} [options.probabilityEstimates=false] - weather to train SVC/SVR model for probability estimates,
         * @param {object} [options.weight] - Set weight for each possible class
         * @param {boolean} [options.quiet=true] - Print info during training if false
         */
                    constructor(options) {
                        this.options = Object.assign({}, options);
                        this.model = null;
                    }

                    /**
         * Trains the SVM model.
         * @param {Array<Array<number>>} samples - The training samples. First level of array are the samples, second
         * level are the individual features
         * @param {Array<number>} labels - The training labels. It should have the same size as the samples. If you are
         * training a classification model, the labels should be distinct integers for each class. If you are training
         * a regression model, each label should be the value of the predicted variable.
         * @throws if SVM instance was instantiated from SVM.load.
         */
                    train(samples, labels) {
                        if (this._deserialized) throw new Error('Train cannot be called on instance created with SVM.load');
                        this.free();
                        this.problem = createProblem(samples, labels);
                        const command = this.getCommand(samples);
                        this.model = train_problem(this.problem, command);
                    }

                    /**
         * Performs k-fold cross-validation (KF-CV). KF-CV separates the data-set into kFold random equally sized partitions,
         * and uses each as a validation set, with all other partitions used in the training set. Observations left over
         * from if kFold does not divide the number of observations are left out of the cross-validation process. If
         * kFold is one, this is equivalent to a leave-on-out cross-validation
         * @param {Array<Array<number>>} samples - The training samples.
         * @param {Array<number>} labels - The training labels.
         * @param {number} kFold - Number of datasets into which to split the training set.
         * @throws if SVM instance was instantiated from SVM.load.
         * @return {Array<number>} The array of predicted labels produced by the cross validation. Has a size equal to
         * the number of samples provided as input.
         */
                    crossValidation(samples, labels, kFold) {
                        if (this._deserialized) throw new Error('crossValidation cannot be called on instance created with SVM.load');
                        const problem = createProblem(samples, labels);
                        const target = libsvm._malloc(labels.length * 8);
                        svm_cross_validation(problem, this.getCommand(samples), kFold, target);
                        const data = libsvm.HEAPF64.subarray(target / 8, target / 8 + labels.length);
                        const arr = Array.from(data);
                        libsvm._free(target);
                        free_problem(problem);
                        return arr;
                    }

                    /**
         * Free the memory allocated for the model. Since this memory is stored in the memory model of emscripten, it is
         * allocated within an ArrayBuffer and WILL NOT BE GARBARGE COLLECTED, you have to explicitly free it. So
         * not calling this will result in memory leaks. As of today in the browser, there is no way to hook the
         * garbage collection of the SVM object to free it automatically.
         * Free the memory that was created by the compiled libsvm library to.
         * store the model. This model is reused every time the predict method is called.
         */
                    free() {
                        if (this.problem) {
                            free_problem(this.problem);
                            this.problem = null;
                        }
                        if (this.model !== null) {
                            svm_free_model(this.model);
                            this.model = null;
                        }
                    }

                    getCommand(samples) {
                        const options = {};
                        Object.assign(options, this.options, {
                            gamma: this.options.gamma ? this.options.gamma : 1 / samples[0].length,
                        });
                        return util.getCommand(options);
                    }

                    /**
         * Predict the label of one sample.
         * @param {Array<number>} sample - The sample to predict.
         * @return {number} - The predicted label.
         */
                    predictOne(sample) {
                        if (this.model === null) {
                            throw new Error('Cannot predict, you must train first');
                        }
                        return predict_one(this.model, new Uint8Array(new Float64Array(sample).buffer), sample.length);
                    }

                    /**
         * Predict the label of many samples.
         * @param {Array<Array<number>>} samples - The samples to predict.
         * @return {Array<number>} - The predicted labels.
         */
                    predict(samples) {
                        const arr = [];
                        for (let i = 0; i < samples.length; i++) {
                            arr.push(this.predictOne(samples[i]));
                        }
                        return arr;
                    }

                    /**
         * Predict the label with probability estimate of many samples.
         * @param {Array<Array<number>>} samples - The samples to predict.
         * @return {Array<object>} - An array of objects containing the prediction label and the probability estimates for each label
         */
                    predictProbability(samples) {
                        const arr = [];
                        for (let i = 0; i < samples.length; i++) {
                            arr.push(this.predictOneProbability(samples[i]));
                        }
                        return arr;
                    }

                    /** Predict the label with probability estimate.
         * @param {Array<number>} sample
         * @return {object} - An object containing the prediction label and the probability estimates for each label
         */

                    predictOneProbability(sample) {
                        const labels = this.getLabels();
                        const nbLabels = labels.length;
                        const estimates = libsvm._malloc(nbLabels * 8);
                        const prediction = predict_one_probability(this.model, new Uint8Array(new Float64Array(sample).buffer), sample.length, estimates);
                        const estimatesArr = Array.from(libsvm.HEAPF64.subarray(estimates / 8, estimates / 8 + nbLabels));
                        const result = {
                            prediction,
                            estimates: labels.map((label, idx) => ({
                                label,
                                probability: estimatesArr[idx],
                            })),
                        };
                        libsvm._free(estimates);
                        return result;
                    }

                    /** Predict a regression value with a confidence interval
         * @param {Array<number>} sample
         * @param {number} confidence - A value between 0 and 1. For example, a value 0.95 will give you the 95% confidence interval of the predicted value.
         * @return {object} - An object containing the prediction value and the lower and upper bounds of the confidence interval
         */
                    predictOneInterval(sample, confidence) {
                        const interval = this._getInterval(confidence);
                        const predicted = this.predictOne(sample);
                        return {
                            predicted,
                            interval: [predicted - interval, predicted + interval],
                        };
                    }

                    /** Predict regression values with confidence intervals
         * @param {Array<Array<number>>} samples - An array of samples.
         * @param {number} confidence - A value between 0 and 1. For example, a value 0.95 will give you the 95% confidence interval of the predicted value.
         * @return {Array<object>} - An array of objects each containing the prediction label and the probability estimates for each label
         */
                    predictInterval(samples, confidence) {
                        const interval = this._getInterval(confidence);
                        const predicted = this.predict(samples);
                        return predicted.map((pred) => ({
                            predicted: pred,
                            interval: [pred - interval, pred + interval],
                        }));
                    }

                    _getInterval(confidence) {
                        const sigma = svm_get_svr_probability(this.model);
                        if (sigma === 0) throw new Error('the model is not a regression with probability estimates');
                        if (confidence <= 0 || confidence >= 1) throw new Error('confidence must be greater than 0 and less than 1');
                        const p = (1 - confidence) / 2;
                        return sigma * Math.sign(p - 0.5) * Math.log2(1 - 2 * Math.abs(p - 0.5));
                    }


                    /**
         * Get the array of labels from the model. Useful when creating an SVM instance with SVM.load
         * @return {Array<number>} - The list of labels.
         */
                    getLabels() {
                        const nbLabels = svm_get_nr_class(this.model);
                        return getIntArrayFromModel(svm_get_labels, this.model, nbLabels);
                    }

                    /**
         * Get the indices of the support vectors from the training set passed to the train method.
         * @return {Array<number>} - The list of indices from the training samples.
         */
                    getSVIndices() {
                        const nSV = svm_get_nr_sv(this.model);
                        return getIntArrayFromModel(svm_get_sv_indices, this.model, nSV)
                            .map((i) => i - 1);
                    }

                    /**
         * Uses libsvm's serialization method of the model.
         * @return {string} The serialization string.
         */
                    serializeModel() {
                        if (!this.model) throw new Error('Cannot serialize model. No model was trained');
                        const result = serialize_model(this.model);
                        const str = libsvm.Pointer_stringify(result);
                        libsvm._free(result);
                        return str;
                    }

                    /**
         * Create a SVM instance from the serialized model.
         * @param {string} serializedModel - The serialized model.
         * @return {SVM} - SVM instance that contains the model.
         */
                    static load(serializedModel) {
                        const svm = new SVM();
                        svm.model = deserialize_model(serializedModel);
                        svm._deserialized = true;
                        return svm;
                    }
                }

                /**
     * SVM classification and regression types
     * @memberof SVM
     * @type {{C_SVC: string, NU_SVC: string, ONE_CLASS: string, EPSILON_SVR: string, NU_SVR: string}}
     * @property C_SVC - The C support vector classifier type
     * @property NU_SVC - The nu support vector classifier type
     * @property ONE_CLASS - The one-class support vector classifier type
     * @property EPSILON_SVR - The epsilon support vector regression type
     * @property NU_SVR - The nu support vector regression type
     */
                SVM.SVM_TYPES = {
                    C_SVC: '0', // C support vector classification
                    NU_SVC: '1', // NU support vector classification
                    ONE_CLASS: '2', // ONE CLASS classification
                    EPSILON_SVR: '3', // Epsilon support vector regression
                    NU_SVR: '4', // Nu support vector regression
                };


                /**
     * SVM kernel types
     * @memberof SVM
     * @type {{LINEAR: string, POLYNOMIAL: string, RBF: string, SIGMOID: string}}
     * @property LINEAR - Linear kernel
     * @property POLYNOMIAL - Polynomial kernel
     * @property RBF - Radial basis function (gaussian) kernel
     * @property SIGMOID - Sigmoid kernel
     */
                SVM.KERNEL_TYPES = {
                    LINEAR: '0',
                    POLYNOMIAL: '1',
                    RBF: '2', // Radial basis function
                    SIGMOID: '3',
                    PRECOMPUTED: '4',
                };

                function getIntArrayFromModel(fn, model, size) {
                    const offset = libsvm._malloc(size * 4);
                    fn(model, offset);
                    const data = libsvm.HEAP32.subarray(offset / 4, offset / 4 + size);
                    const arr = Array.from(data);
                    libsvm._free(offset);
                    return arr;
                }

                function createProblem(samples, labels) {
                    const nbSamples = samples.length;
                    const nbFeatures = samples[0].length;
                    const problem = create_svm_nodes(nbSamples, nbFeatures);
                    for (let i = 0; i < nbSamples; i++) {
                        add_instance(problem, new Uint8Array(new Float64Array(samples[i]).buffer), nbFeatures, labels[i], i);
                    }
                    return problem;
                }

                return SVM;
            };
            /** */}),
        /* 4 */
        /** */ (function(module, exports, __webpack_require__) {
            'use strict';


            const mapOptionToCommand = {
                quiet: 'q',
                type: 's',
                kernel: 't',
                degree: 'd',
                gamma: 'g',
                coef0: 'r',
                cost: 'c',
                nu: 'n',
                epsilon: 'p',
                cacheSize: 'm',
                tolerance: 'e',
                shrinking: 'h',
                probabilityEstimates: 'b',
                weight: 'w',
            };

            module.exports = {
                getCommand: function getCommand(options) {
                    let str = '';
                    const keys = Object.keys(options);
                    for (let i = 0; i < keys.length; i++) {
                        const key = keys[i];
                        if (options[key] == null) continue;
                        if (mapOptionToCommand[key] == null) throw new Error('Bad option');
                        if (str) str += ' ';
                        switch (key) {
                        case 'probabilityEstimates':
                        case 'shrinking':
                            str += `-${mapOptionToCommand[key]} ${options[key] ? 1 : 0}`;
                            break;
                        case 'quiet': {
                            if (options[key]) {
                                str += `-${mapOptionToCommand[key]} 1`;
                            }
                            break;
                        }
                        case 'weight': {
                            const weightKeys = Object.keys(options.weight);
                            for (let j = 0; j < weightKeys.length; j++) {
                                if (j !== 0) str += ' ';
                                str += `-w${weightKeys[j]} ${options.weight[weightKeys[j]]}`;
                            }
                            break;
                        }
                        default: {
                            str += `-${mapOptionToCommand[key]} ${options[key]}`;
                            break;
                        }
                        }
                    }

                    return str;
                },
            };
            /** */}),
        /* 5 */
        /** */ (function(module, exports, __webpack_require__) {
            'use strict';
            /* WEBPACK VAR INJECTION */(function(__dirname, process) {
                let Module;
                (function() {
                    function getCurrentPathBrowser() {
                        if (
                            typeof WorkerGlobalScope !== 'undefined' &&
      self instanceof WorkerGlobalScope
                        ) {
                            return self.location.href;
                        }
                        const sc = document.getElementsByTagName('script');

                        for (let idx = 0; idx < sc.length; idx++) {
                            const s = sc.item(idx);

                            if (s.src && s.src.match(/libsvm\.js$/)) {
                                return s.src;
                            }
                        }
                        return window.location.href;
                    }
                    function getModuleForBrowser() {
                        let URL;
                        if (
                            typeof WorkerGlobalScope !== 'undefined' &&
      self instanceof WorkerGlobalScope
                        ) {
                            URL = self.URL;
                        } else {
                            URL = window.URL;
                        }
                        let resolve;
                        const promise = new Promise((res, rej) => {
                            resolve = res;
                        });
                        const path = getCurrentPathBrowser();
                        const Module = {
                            locateFile(url) {
                                return new URL(url, path).href;
                            },
                            onRuntimeInitialized() {
                                resolve();
                            },
                            load() {
                                return promise;
                            },
                        };
                        return Module;
                    }
                    function getModuleForNode() {
                        let resolve;
                        const promise = new Promise((res) => {
                            resolve = res;
                        });
                        const Module = {
                            locateFile(url) {
                                return `${__dirname}/${url}`;
                            },
                            onRuntimeInitialized() {
                                resolve();
                            },
                            load() {
                                return promise;
                            },
                        };
                        return Module;
                    }

                    if (typeof window === 'undefined' && typeof self === 'undefined') {
                        Module = getModuleForNode();
                    } else {
                        Module = getModuleForBrowser();
                    }
                })();
                const SVM = function(SVM) {
                    SVM = SVM || {};

                    const Module=typeof SVM!=='undefined'?SVM:{}; let moduleOverrides={}; let key; for (key in Module) {
                        if (Module.hasOwnProperty(key)) {
                            moduleOverrides[key]=Module[key];
                        }
                    }Module['arguments']=[]; Module['thisProgram']='./this.program'; Module['quit']=(function(status, toThrow) {
                        throw toThrow;
                    }); Module['preRun']=[]; Module['postRun']=[]; let ENVIRONMENT_IS_WEB=false; let ENVIRONMENT_IS_WORKER=false; let ENVIRONMENT_IS_NODE=false; let ENVIRONMENT_IS_SHELL=false; if (Module['ENVIRONMENT']) {
                        if (Module['ENVIRONMENT']==='WEB') {
                            ENVIRONMENT_IS_WEB=true;
                        } else if (Module['ENVIRONMENT']==='WORKER') {
                            ENVIRONMENT_IS_WORKER=true;
                        } else if (Module['ENVIRONMENT']==='NODE') {
                            ENVIRONMENT_IS_NODE=true;
                        } else if (Module['ENVIRONMENT']==='SHELL') {
                            ENVIRONMENT_IS_SHELL=true;
                        } else {
                            throw new Error('Module[\'ENVIRONMENT\'] value is not valid. must be one of: WEB|WORKER|NODE|SHELL.');
                        }
                    } else {
                        ENVIRONMENT_IS_WEB=typeof window==='object'; ENVIRONMENT_IS_WORKER=typeof importScripts==='function'; ENVIRONMENT_IS_NODE=typeof process==='object'&&'function'==='function'&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER; ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;
                    } if (ENVIRONMENT_IS_NODE) {
                        let nodeFS; let nodePath; Module['read']=function shell_read(filename, binary) {
                            let ret; if (!nodeFS)nodeFS=__webpack_require__(0); if (!nodePath)nodePath=__webpack_require__(0); filename=nodePath['normalize'](filename); ret=nodeFS['readFileSync'](filename); return binary?ret:ret.toString();
                        }; Module['readBinary']=function readBinary(filename) {
                            let ret=Module['read'](filename, true); if (!ret.buffer) {
                                ret=new Uint8Array(ret);
                            }assert(ret.buffer); return ret;
                        }; if (process['argv'].length>1) {
                            Module['thisProgram']=process['argv'][1].replace(/\\/g, '/');
                        }Module['arguments']=process['argv'].slice(2); process['on']('unhandledRejection', (function(reason, p) {
                            process['exit'](1);
                        })); Module['inspect']=(function() {
                            return '[Emscripten Module object]';
                        });
                    } else if (ENVIRONMENT_IS_SHELL) {
                        if (typeof read!='undefined') {
                            Module['read']=function shell_read(f) {
                                return read(f);
                            };
                        }Module['readBinary']=function readBinary(f) {
                            let data; if (typeof readbuffer==='function') {
                                return new Uint8Array(readbuffer(f));
                            }data=read(f, 'binary'); assert(typeof data==='object'); return data;
                        }; if (typeof scriptArgs!='undefined') {
                            Module['arguments']=scriptArgs;
                        } else if (typeof arguments!='undefined') {
                            Module['arguments']=arguments;
                        } if (typeof quit==='function') {
                            Module['quit']=(function(status, toThrow) {
                                quit(status);
                            });
                        }
                    } else if (ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER) {
                        Module['read']=function shell_read(url) {
                            const xhr=new XMLHttpRequest; xhr.open('GET', url, false); xhr.send(null); return xhr.responseText;
                        }; if (ENVIRONMENT_IS_WORKER) {
                            Module['readBinary']=function readBinary(url) {
                                const xhr=new XMLHttpRequest; xhr.open('GET', url, false); xhr.responseType='arraybuffer'; xhr.send(null); return new Uint8Array(xhr.response);
                            };
                        }Module['readAsync']=function readAsync(url, onload, onerror) {
                            const xhr=new XMLHttpRequest; xhr.open('GET', url, true); xhr.responseType='arraybuffer'; xhr.onload=function xhr_onload() {
                                if (xhr.status==200||xhr.status==0&&xhr.response) {
                                    onload(xhr.response); return;
                                }onerror();
                            }; xhr.onerror=onerror; xhr.send(null);
                        }; if (typeof arguments!='undefined') {
                            Module['arguments']=arguments;
                        }Module['setWindowTitle']=(function(title) {
                            document.title=title;
                        });
                    }Module['print']=typeof console!=='undefined'?console.log.bind(console):typeof print!=='undefined'?print:null; Module['printErr']=typeof printErr!=='undefined'?printErr:typeof console!=='undefined'&&console.warn.bind(console)||Module['print']; Module.print=Module['print']; Module.printErr=Module['printErr']; for (key in moduleOverrides) {
                        if (moduleOverrides.hasOwnProperty(key)) {
                            Module[key]=moduleOverrides[key];
                        }
                    }moduleOverrides=undefined; const STACK_ALIGN=16; function staticAlloc(size) {
                        assert(!staticSealed); const ret=STATICTOP; STATICTOP=STATICTOP+size+15&-16; return ret;
                    } function alignMemory(size, factor) {
                        if (!factor)factor=STACK_ALIGN; const ret=size=Math.ceil(size/factor)*factor; return ret;
                    } const functionPointers=new Array(0); const GLOBAL_BASE=1024; let ABORT=0; let EXITSTATUS=0; function assert(condition, text) {
                        if (!condition) {
                            abort('Assertion failed: '+text);
                        }
                    } function getCFunc(ident) {
                        const func=Module['_'+ident]; assert(func, 'Cannot call unknown function '+ident+', make sure it is exported'); return func;
                    } const JSfuncs={'stackSave': (function() {
                        stackSave();
                    }), 'stackRestore': (function() {
                        stackRestore();
                    }), 'arrayToC': (function(arr) {
                        const ret=stackAlloc(arr.length); writeArrayToMemory(arr, ret); return ret;
                    }), 'stringToC': (function(str) {
                        let ret=0; if (str!==null&&str!==undefined&&str!==0) {
                            const len=(str.length<<2)+1; ret=stackAlloc(len); stringToUTF8(str, ret, len);
                        } return ret;
                    })}; const toC={'string': JSfuncs['stringToC'], 'array': JSfuncs['arrayToC']}; function ccall(ident, returnType, argTypes, args, opts) {
                        const func=getCFunc(ident); const cArgs=[]; let stack=0; if (args) {
                            for (let i=0; i<args.length; i++) {
                                const converter=toC[argTypes[i]]; if (converter) {
                                    if (stack===0)stack=stackSave(); cArgs[i]=converter(args[i]);
                                } else {
                                    cArgs[i]=args[i];
                                }
                            }
                        } let ret=func.apply(null, cArgs); if (returnType==='string')ret=Pointer_stringify(ret); if (stack!==0) {
                            stackRestore(stack);
                        } return ret;
                    } function cwrap(ident, returnType, argTypes) {
                        argTypes=argTypes||[]; const cfunc=getCFunc(ident); const numericArgs=argTypes.every((function(type) {
                            return type==='number';
                        })); const numericRet=returnType!=='string'; if (numericRet&&numericArgs) {
                            return cfunc;
                        } return (function() {
                            return ccall(ident, returnType, argTypes, arguments);
                        });
                    } function Pointer_stringify(ptr, length) {
                        if (length===0||!ptr) return ''; let hasUtf=0; let t; let i=0; while (1) {
                            t=HEAPU8[ptr+i>>0]; hasUtf|=t; if (t==0&&!length) break; i++; if (length&&i==length) break;
                        } if (!length)length=i; let ret=''; if (hasUtf<128) {
                            const MAX_CHUNK=1024; let curr; while (length>0) {
                                curr=String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr+Math.min(length, MAX_CHUNK))); ret=ret?ret+curr:curr; ptr+=MAX_CHUNK; length-=MAX_CHUNK;
                            } return ret;
                        } return UTF8ToString(ptr);
                    } const UTF8Decoder=typeof TextDecoder!=='undefined'?new TextDecoder('utf8'):undefined; function UTF8ArrayToString(u8Array, idx) {
                        let endPtr=idx; while (u8Array[endPtr])++endPtr; if (endPtr-idx>16&&u8Array.subarray&&UTF8Decoder) {
                            return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
                        } else {
                            let u0; let u1; let u2; let u3; let u4; let u5; let str=''; while (1) {
                                u0=u8Array[idx++]; if (!u0) return str; if (!(u0&128)) {
                                    str+=String.fromCharCode(u0); continue;
                                }u1=u8Array[idx++]&63; if ((u0&224)==192) {
                                    str+=String.fromCharCode((u0&31)<<6|u1); continue;
                                }u2=u8Array[idx++]&63; if ((u0&240)==224) {
                                    u0=(u0&15)<<12|u1<<6|u2;
                                } else {
                                    u3=u8Array[idx++]&63; if ((u0&248)==240) {
                                        u0=(u0&7)<<18|u1<<12|u2<<6|u3;
                                    } else {
                                        u4=u8Array[idx++]&63; if ((u0&252)==248) {
                                            u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4;
                                        } else {
                                            u5=u8Array[idx++]&63; u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5;
                                        }
                                    }
                                } if (u0<65536) {
                                    str+=String.fromCharCode(u0);
                                } else {
                                    const ch=u0-65536; str+=String.fromCharCode(55296|ch>>10, 56320|ch&1023);
                                }
                            }
                        }
                    } function UTF8ToString(ptr) {
                        return UTF8ArrayToString(HEAPU8, ptr);
                    } function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
                        if (!(maxBytesToWrite>0)) return 0; const startIdx=outIdx; const endIdx=outIdx+maxBytesToWrite-1; for (let i=0; i<str.length; ++i) {
                            let u=str.charCodeAt(i); if (u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023; if (u<=127) {
                                if (outIdx>=endIdx) break; outU8Array[outIdx++]=u;
                            } else if (u<=2047) {
                                if (outIdx+1>=endIdx) break; outU8Array[outIdx++]=192|u>>6; outU8Array[outIdx++]=128|u&63;
                            } else if (u<=65535) {
                                if (outIdx+2>=endIdx) break; outU8Array[outIdx++]=224|u>>12; outU8Array[outIdx++]=128|u>>6&63; outU8Array[outIdx++]=128|u&63;
                            } else if (u<=2097151) {
                                if (outIdx+3>=endIdx) break; outU8Array[outIdx++]=240|u>>18; outU8Array[outIdx++]=128|u>>12&63; outU8Array[outIdx++]=128|u>>6&63; outU8Array[outIdx++]=128|u&63;
                            } else if (u<=67108863) {
                                if (outIdx+4>=endIdx) break; outU8Array[outIdx++]=248|u>>24; outU8Array[outIdx++]=128|u>>18&63; outU8Array[outIdx++]=128|u>>12&63; outU8Array[outIdx++]=128|u>>6&63; outU8Array[outIdx++]=128|u&63;
                            } else {
                                if (outIdx+5>=endIdx) break; outU8Array[outIdx++]=252|u>>30; outU8Array[outIdx++]=128|u>>24&63; outU8Array[outIdx++]=128|u>>18&63; outU8Array[outIdx++]=128|u>>12&63; outU8Array[outIdx++]=128|u>>6&63; outU8Array[outIdx++]=128|u&63;
                            }
                        }outU8Array[outIdx]=0; return outIdx-startIdx;
                    } function stringToUTF8(str, outPtr, maxBytesToWrite) {
                        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
                    } function lengthBytesUTF8(str) {
                        let len=0; for (let i=0; i<str.length; ++i) {
                            let u=str.charCodeAt(i); if (u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023; if (u<=127) {
                                ++len;
                            } else if (u<=2047) {
                                len+=2;
                            } else if (u<=65535) {
                                len+=3;
                            } else if (u<=2097151) {
                                len+=4;
                            } else if (u<=67108863) {
                                len+=5;
                            } else {
                                len+=6;
                            }
                        } return len;
                    } const UTF16Decoder=typeof TextDecoder!=='undefined'?new TextDecoder('utf-16le'):undefined; function allocateUTF8(str) {
                        const size=lengthBytesUTF8(str)+1; const ret=_malloc(size); if (ret)stringToUTF8Array(str, HEAP8, ret, size); return ret;
                    } function demangle(func) {
                        return func;
                    } function demangleAll(text) {
                        const regex=/__Z[\w\d_]+/g; return text.replace(regex, (function(x) {
                            const y=demangle(x); return x===y?x:x+' ['+y+']';
                        }));
                    } function jsStackTrace() {
                        let err=new Error; if (!err.stack) {
                            try {
                                throw new Error(0);
                            } catch (e) {
                                err=e;
                            } if (!err.stack) {
                                return '(no stack trace available)';
                            }
                        } return err.stack.toString();
                    } function stackTrace() {
                        let js=jsStackTrace(); if (Module['extraStackTrace'])js+='\n'+Module['extraStackTrace'](); return demangleAll(js);
                    } const WASM_PAGE_SIZE=65536; const ASMJS_PAGE_SIZE=16777216; const MIN_TOTAL_MEMORY=16777216; function alignUp(x, multiple) {
                        if (x%multiple>0) {
                            x+=multiple-x%multiple;
                        } return x;
                    } let buffer; let HEAP8; let HEAPU8; let HEAP16; let HEAPU16; let HEAP32; let HEAPU32; let HEAPF32; let HEAPF64; function updateGlobalBuffer(buf) {
                        Module['buffer']=buffer=buf;
                    } function updateGlobalBufferViews() {
                        Module['HEAP8']=HEAP8=new Int8Array(buffer); Module['HEAP16']=HEAP16=new Int16Array(buffer); Module['HEAP32']=HEAP32=new Int32Array(buffer); Module['HEAPU8']=HEAPU8=new Uint8Array(buffer); Module['HEAPU16']=HEAPU16=new Uint16Array(buffer); Module['HEAPU32']=HEAPU32=new Uint32Array(buffer); Module['HEAPF32']=HEAPF32=new Float32Array(buffer); Module['HEAPF64']=HEAPF64=new Float64Array(buffer);
                    } let STATIC_BASE; let STATICTOP; let staticSealed; let STACK_BASE; let STACKTOP; let STACK_MAX; let DYNAMIC_BASE; let DYNAMICTOP_PTR; STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0; staticSealed=false; function abortOnCannotGrowMemory() {
                        abort('Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value '+TOTAL_MEMORY+', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
                    } if (!Module['reallocBuffer']) {
                        Module['reallocBuffer']=(function(size) {
                            let ret; try {
                                if (ArrayBuffer.transfer) {
                                    ret=ArrayBuffer.transfer(buffer, size);
                                } else {
                                    const oldHEAP8=HEAP8; ret=new ArrayBuffer(size); const temp=new Int8Array(ret); temp.set(oldHEAP8);
                                }
                            } catch (e) {
                                return false;
                            } const success=_emscripten_replace_memory(ret); if (!success) return false; return ret;
                        });
                    } function enlargeMemory() {
                        const PAGE_MULTIPLE=Module['usingWasm']?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE; const LIMIT=2147483648-PAGE_MULTIPLE; if (HEAP32[DYNAMICTOP_PTR>>2]>LIMIT) {
                            return false;
                        } const OLD_TOTAL_MEMORY=TOTAL_MEMORY; TOTAL_MEMORY=Math.max(TOTAL_MEMORY, MIN_TOTAL_MEMORY); while (TOTAL_MEMORY<HEAP32[DYNAMICTOP_PTR>>2]) {
                            if (TOTAL_MEMORY<=536870912) {
                                TOTAL_MEMORY=alignUp(2*TOTAL_MEMORY, PAGE_MULTIPLE);
                            } else {
                                TOTAL_MEMORY=Math.min(alignUp((3*TOTAL_MEMORY+2147483648)/4, PAGE_MULTIPLE), LIMIT);
                            }
                        } const replacement=Module['reallocBuffer'](TOTAL_MEMORY); if (!replacement||replacement.byteLength!=TOTAL_MEMORY) {
                            TOTAL_MEMORY=OLD_TOTAL_MEMORY; return false;
                        }updateGlobalBuffer(replacement); updateGlobalBufferViews(); return true;
                    } let byteLength; try {
                        byteLength=Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength').get); byteLength(new ArrayBuffer(4));
                    } catch (e) {
                        byteLength=(function(buffer) {
                            return buffer.byteLength;
                        });
                    } const TOTAL_STACK=Module['TOTAL_STACK']||5242880; var TOTAL_MEMORY=Module['TOTAL_MEMORY']||16777216; if (TOTAL_MEMORY<TOTAL_STACK)Module.printErr('TOTAL_MEMORY should be larger than TOTAL_STACK, was '+TOTAL_MEMORY+'! (TOTAL_STACK='+TOTAL_STACK+')'); if (Module['buffer']) {
                        buffer=Module['buffer'];
                    } else {
                        if (typeof WebAssembly==='object'&&typeof WebAssembly.Memory==='function') {
                            Module['wasmMemory']=new WebAssembly.Memory({'initial': TOTAL_MEMORY/WASM_PAGE_SIZE}); buffer=Module['wasmMemory'].buffer;
                        } else {
                            buffer=new ArrayBuffer(TOTAL_MEMORY);
                        }Module['buffer']=buffer;
                    }updateGlobalBufferViews(); function getTotalMemory() {
                        return TOTAL_MEMORY;
                    }HEAP32[0]=1668509029; HEAP16[1]=25459; if (HEAPU8[2]!==115||HEAPU8[3]!==99) throw 'Runtime error: expected the system to be little-endian!'; function callRuntimeCallbacks(callbacks) {
                        while (callbacks.length>0) {
                            const callback=callbacks.shift(); if (typeof callback=='function') {
                                callback(); continue;
                            } const func=callback.func; if (typeof func==='number') {
                                if (callback.arg===undefined) {
                                    Module['dynCall_v'](func);
                                } else {
                                    Module['dynCall_vi'](func, callback.arg);
                                }
                            } else {
                                func(callback.arg===undefined?null:callback.arg);
                            }
                        }
                    } const __ATPRERUN__=[]; const __ATINIT__=[]; const __ATMAIN__=[]; const __ATEXIT__=[]; const __ATPOSTRUN__=[]; let runtimeInitialized=false; let runtimeExited=false; function preRun() {
                        if (Module['preRun']) {
                            if (typeof Module['preRun']=='function')Module['preRun']=[Module['preRun']]; while (Module['preRun'].length) {
                                addOnPreRun(Module['preRun'].shift());
                            }
                        }callRuntimeCallbacks(__ATPRERUN__);
                    } function ensureInitRuntime() {
                        if (runtimeInitialized) return; runtimeInitialized=true; callRuntimeCallbacks(__ATINIT__);
                    } function preMain() {
                        callRuntimeCallbacks(__ATMAIN__);
                    } function exitRuntime() {
                        callRuntimeCallbacks(__ATEXIT__); runtimeExited=true;
                    } function postRun() {
                        if (Module['postRun']) {
                            if (typeof Module['postRun']=='function')Module['postRun']=[Module['postRun']]; while (Module['postRun'].length) {
                                addOnPostRun(Module['postRun'].shift());
                            }
                        }callRuntimeCallbacks(__ATPOSTRUN__);
                    } function addOnPreRun(cb) {
                        __ATPRERUN__.unshift(cb);
                    } function addOnPostRun(cb) {
                        __ATPOSTRUN__.unshift(cb);
                    } function writeArrayToMemory(array, buffer) {
                        HEAP8.set(array, buffer);
                    } function writeAsciiToMemory(str, buffer, dontAddNull) {
                        for (let i=0; i<str.length; ++i) {
                            HEAP8[buffer++>>0]=str.charCodeAt(i);
                        } if (!dontAddNull)HEAP8[buffer>>0]=0;
                    } const Math_abs=Math.abs; const Math_cos=Math.cos; const Math_sin=Math.sin; const Math_tan=Math.tan; const Math_acos=Math.acos; const Math_asin=Math.asin; const Math_atan=Math.atan; const Math_atan2=Math.atan2; const Math_exp=Math.exp; const Math_log=Math.log; const Math_sqrt=Math.sqrt; const Math_ceil=Math.ceil; const Math_floor=Math.floor; const Math_pow=Math.pow; const Math_imul=Math.imul; const Math_fround=Math.fround; const Math_round=Math.round; const Math_min=Math.min; const Math_max=Math.max; const Math_clz32=Math.clz32; const Math_trunc=Math.trunc; let runDependencies=0; let runDependencyWatcher=null; let dependenciesFulfilled=null; function getUniqueRunDependency(id) {
                        return id;
                    } function addRunDependency(id) {
                        runDependencies++; if (Module['monitorRunDependencies']) {
                            Module['monitorRunDependencies'](runDependencies);
                        }
                    } function removeRunDependency(id) {
                        runDependencies--; if (Module['monitorRunDependencies']) {
                            Module['monitorRunDependencies'](runDependencies);
                        } if (runDependencies==0) {
                            if (runDependencyWatcher!==null) {
                                clearInterval(runDependencyWatcher); runDependencyWatcher=null;
                            } if (dependenciesFulfilled) {
                                const callback=dependenciesFulfilled; dependenciesFulfilled=null; callback();
                            }
                        }
                    }Module['preloadedImages']={}; Module['preloadedAudios']={}; const dataURIPrefix='data:application/octet-stream;base64,'; function isDataURI(filename) {
                        return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0;
                    } function integrateWasmJS() {
                        let wasmTextFile='libsvm.wast'; let wasmBinaryFile='libsvm.wasm'; let asmjsCodeFile='libsvm.temp.asm.js'; if (typeof Module['locateFile']==='function') {
                            if (!isDataURI(wasmTextFile)) {
                                wasmTextFile=Module['locateFile'](wasmTextFile);
                            } if (!isDataURI(wasmBinaryFile)) {
                                wasmBinaryFile=Module['locateFile'](wasmBinaryFile);
                            } if (!isDataURI(asmjsCodeFile)) {
                                asmjsCodeFile=Module['locateFile'](asmjsCodeFile);
                            }
                        } const wasmPageSize=64*1024; const info={'global': null, 'env': null, 'asm2wasm': {'f64-rem': (function(x, y) {
                            return x%y;
                        }), 'debugger': (function() {
                            debugger;
                        })}, 'parent': Module}; let exports=null; function mergeMemory(newBuffer) {
                            const oldBuffer=Module['buffer']; if (newBuffer.byteLength<oldBuffer.byteLength) {
                                Module['printErr']('the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here');
                            } const oldView=new Int8Array(oldBuffer); const newView=new Int8Array(newBuffer); newView.set(oldView); updateGlobalBuffer(newBuffer); updateGlobalBufferViews();
                        } function fixImports(imports) {
                            return imports;
                        } function getBinary() {
                            try {
                                if (Module['wasmBinary']) {
                                    return new Uint8Array(Module['wasmBinary']);
                                } if (Module['readBinary']) {
                                    return Module['readBinary'](wasmBinaryFile);
                                } else {
                                    throw 'on the web, we need the wasm binary to be preloaded and set on Module[\'wasmBinary\']. emcc.py will do that for you when generating HTML (but not JS)';
                                }
                            } catch (err) {
                                abort(err);
                            }
                        } function getBinaryPromise() {
                            if (!Module['wasmBinary']&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==='function') {
                                return fetch(wasmBinaryFile, {credentials: 'same-origin'}).then((function(response) {
                                    if (!response['ok']) {
                                        throw 'failed to load wasm binary file at \''+wasmBinaryFile+'\'';
                                    } return response['arrayBuffer']();
                                })).catch((function() {
                                    return getBinary();
                                }));
                            } return new Promise((function(resolve, reject) {
                                resolve(getBinary());
                            }));
                        } function doNativeWasm(global, env, providedBuffer) {
                            if (typeof WebAssembly!=='object') {
                                Module['printErr']('no native wasm support detected'); return false;
                            } if (!(Module['wasmMemory']instanceof WebAssembly.Memory)) {
                                Module['printErr']('no native wasm Memory in use'); return false;
                            }env['memory']=Module['wasmMemory']; info['global']={'NaN': NaN, 'Infinity': Infinity}; info['global.Math']=Math; info['env']=env; function receiveInstance(instance, module) {
                                exports=instance.exports; if (exports.memory)mergeMemory(exports.memory); Module['asm']=exports; Module['usingWasm']=true; removeRunDependency('wasm-instantiate');
                            }addRunDependency('wasm-instantiate'); if (Module['instantiateWasm']) {
                                try {
                                    return Module['instantiateWasm'](info, receiveInstance);
                                } catch (e) {
                                    Module['printErr']('Module.instantiateWasm callback failed with error: '+e); return false;
                                }
                            } function receiveInstantiatedSource(output) {
                                receiveInstance(output['instance'], output['module']);
                            } function instantiateArrayBuffer(receiver) {
                                getBinaryPromise().then((function(binary) {
                                    return WebAssembly.instantiate(binary, info);
                                })).then(receiver).catch((function(reason) {
                                    Module['printErr']('failed to asynchronously prepare wasm: '+reason); abort(reason);
                                }));
                            } if (!Module['wasmBinary']&&typeof WebAssembly.instantiateStreaming==='function'&&!isDataURI(wasmBinaryFile)&&typeof fetch==='function') {
                                WebAssembly.instantiateStreaming(fetch(wasmBinaryFile, {credentials: 'same-origin'}), info).then(receiveInstantiatedSource).catch((function(reason) {
                                    Module['printErr']('wasm streaming compile failed: '+reason); Module['printErr']('falling back to ArrayBuffer instantiation'); instantiateArrayBuffer(receiveInstantiatedSource);
                                }));
                            } else {
                                instantiateArrayBuffer(receiveInstantiatedSource);
                            } return {};
                        }Module['asmPreload']=Module['asm']; const asmjsReallocBuffer=Module['reallocBuffer']; const wasmReallocBuffer=(function(size) {
                            const PAGE_MULTIPLE=Module['usingWasm']?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE; size=alignUp(size, PAGE_MULTIPLE); const old=Module['buffer']; const oldSize=old.byteLength; if (Module['usingWasm']) {
                                try {
                                    const result=Module['wasmMemory'].grow((size-oldSize)/wasmPageSize); if (result!==(-1|0)) {
                                        return Module['buffer']=Module['wasmMemory'].buffer;
                                    } else {
                                        return null;
                                    }
                                } catch (e) {
                                    return null;
                                }
                            }
                        }); Module['reallocBuffer']=(function(size) {
                            if (finalMethod==='asmjs') {
                                return asmjsReallocBuffer(size);
                            } else {
                                return wasmReallocBuffer(size);
                            }
                        }); var finalMethod=''; Module['asm']=(function(global, env, providedBuffer) {
                            env=fixImports(env); if (!env['table']) {
                                let TABLE_SIZE=Module['wasmTableSize']; if (TABLE_SIZE===undefined)TABLE_SIZE=1024; const MAX_TABLE_SIZE=Module['wasmMaxTableSize']; if (typeof WebAssembly==='object'&&typeof WebAssembly.Table==='function') {
                                    if (MAX_TABLE_SIZE!==undefined) {
                                        env['table']=new WebAssembly.Table({'initial': TABLE_SIZE, 'maximum': MAX_TABLE_SIZE, 'element': 'anyfunc'});
                                    } else {
                                        env['table']=new WebAssembly.Table({'initial': TABLE_SIZE, 'element': 'anyfunc'});
                                    }
                                } else {
                                    env['table']=new Array(TABLE_SIZE);
                                }Module['wasmTable']=env['table'];
                            } if (!env['memoryBase']) {
                                env['memoryBase']=Module['STATIC_BASE'];
                            } if (!env['tableBase']) {
                                env['tableBase']=0;
                            } let exports; exports=doNativeWasm(global, env, providedBuffer); if (!exports)abort('no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods'); return exports;
                        });
                    }integrateWasmJS(); STATIC_BASE=GLOBAL_BASE; STATICTOP=STATIC_BASE+9024; __ATINIT__.push(); const STATIC_BUMP=9024; Module['STATIC_BASE']=STATIC_BASE; Module['STATIC_BUMP']=STATIC_BUMP; STATICTOP+=16; function ___cxa_allocate_exception(size) {
                        return _malloc(size);
                    } function __ZSt18uncaught_exceptionv() {
                        return !!__ZSt18uncaught_exceptionv.uncaught_exception;
                    } var EXCEPTIONS={last: 0, caught: [], infos: {}, deAdjust: (function(adjusted) {
                        if (!adjusted||EXCEPTIONS.infos[adjusted]) return adjusted; for (const ptr in EXCEPTIONS.infos) {
                            const info=EXCEPTIONS.infos[ptr]; if (info.adjusted===adjusted) {
                                return ptr;
                            }
                        } return adjusted;
                    }), addRef: (function(ptr) {
                        if (!ptr) return; const info=EXCEPTIONS.infos[ptr]; info.refcount++;
                    }), decRef: (function(ptr) {
                        if (!ptr) return; const info=EXCEPTIONS.infos[ptr]; assert(info.refcount>0); info.refcount--; if (info.refcount===0&&!info.rethrown) {
                            if (info.destructor) {
                                Module['dynCall_vi'](info.destructor, ptr);
                            } delete EXCEPTIONS.infos[ptr]; ___cxa_free_exception(ptr);
                        }
                    }), clearRef: (function(ptr) {
                        if (!ptr) return; const info=EXCEPTIONS.infos[ptr]; info.refcount=0;
                    })}; function ___cxa_begin_catch(ptr) {
                        const info=EXCEPTIONS.infos[ptr]; if (info&&!info.caught) {
                            info.caught=true; __ZSt18uncaught_exceptionv.uncaught_exception--;
                        } if (info)info.rethrown=false; EXCEPTIONS.caught.push(ptr); EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(ptr)); return ptr;
                    } function ___cxa_free_exception(ptr) {
                        try {
                            return _free(ptr);
                        } catch (e) {}
                    } function ___cxa_end_catch() {
                        Module['setThrew'](0); const ptr=EXCEPTIONS.caught.pop(); if (ptr) {
                            EXCEPTIONS.decRef(EXCEPTIONS.deAdjust(ptr)); EXCEPTIONS.last=0;
                        }
                    } function ___cxa_find_matching_catch_2() {
                        return ___cxa_find_matching_catch.apply(null, arguments);
                    } function ___cxa_find_matching_catch_3() {
                        return ___cxa_find_matching_catch.apply(null, arguments);
                    } function ___cxa_pure_virtual() {
                        ABORT=true; throw 'Pure virtual function called!';
                    } function ___resumeException(ptr) {
                        if (!EXCEPTIONS.last) {
                            EXCEPTIONS.last=ptr;
                        } throw ptr;
                    } function ___cxa_find_matching_catch() {
                        let thrown=EXCEPTIONS.last; if (!thrown) {
                            return (setTempRet0(0), 0)|0;
                        } const info=EXCEPTIONS.infos[thrown]; const throwntype=info.type; if (!throwntype) {
                            return (setTempRet0(0), thrown)|0;
                        } const typeArray=Array.prototype.slice.call(arguments); const pointer=Module['___cxa_is_pointer_type'](throwntype); if (!___cxa_find_matching_catch.buffer)___cxa_find_matching_catch.buffer=_malloc(4); HEAP32[___cxa_find_matching_catch.buffer>>2]=thrown; thrown=___cxa_find_matching_catch.buffer; for (let i=0; i<typeArray.length; i++) {
                            if (typeArray[i]&&Module['___cxa_can_catch'](typeArray[i], throwntype, thrown)) {
                                thrown=HEAP32[thrown>>2]; info.adjusted=thrown; return (setTempRet0(typeArray[i]), thrown)|0;
                            }
                        }thrown=HEAP32[thrown>>2]; return (setTempRet0(throwntype), thrown)|0;
                    } function ___cxa_throw(ptr, type, destructor) {
                        EXCEPTIONS.infos[ptr]={ptr: ptr, adjusted: ptr, type: type, destructor: destructor, refcount: 0, caught: false, rethrown: false}; EXCEPTIONS.last=ptr; if (!('uncaught_exception'in __ZSt18uncaught_exceptionv)) {
                            __ZSt18uncaught_exceptionv.uncaught_exception=1;
                        } else {
                            __ZSt18uncaught_exceptionv.uncaught_exception++;
                        } throw ptr;
                    } function ___lock() {} const ERRNO_CODES={EPERM: 1, ENOENT: 2, ESRCH: 3, EINTR: 4, EIO: 5, ENXIO: 6, E2BIG: 7, ENOEXEC: 8, EBADF: 9, ECHILD: 10, EAGAIN: 11, EWOULDBLOCK: 11, ENOMEM: 12, EACCES: 13, EFAULT: 14, ENOTBLK: 15, EBUSY: 16, EEXIST: 17, EXDEV: 18, ENODEV: 19, ENOTDIR: 20, EISDIR: 21, EINVAL: 22, ENFILE: 23, EMFILE: 24, ENOTTY: 25, ETXTBSY: 26, EFBIG: 27, ENOSPC: 28, ESPIPE: 29, EROFS: 30, EMLINK: 31, EPIPE: 32, EDOM: 33, ERANGE: 34, ENOMSG: 42, EIDRM: 43, ECHRNG: 44, EL2NSYNC: 45, EL3HLT: 46, EL3RST: 47, ELNRNG: 48, EUNATCH: 49, ENOCSI: 50, EL2HLT: 51, EDEADLK: 35, ENOLCK: 37, EBADE: 52, EBADR: 53, EXFULL: 54, ENOANO: 55, EBADRQC: 56, EBADSLT: 57, EDEADLOCK: 35, EBFONT: 59, ENOSTR: 60, ENODATA: 61, ETIME: 62, ENOSR: 63, ENONET: 64, ENOPKG: 65, EREMOTE: 66, ENOLINK: 67, EADV: 68, ESRMNT: 69, ECOMM: 70, EPROTO: 71, EMULTIHOP: 72, EDOTDOT: 73, EBADMSG: 74, ENOTUNIQ: 76, EBADFD: 77, EREMCHG: 78, ELIBACC: 79, ELIBBAD: 80, ELIBSCN: 81, ELIBMAX: 82, ELIBEXEC: 83, ENOSYS: 38, ENOTEMPTY: 39, ENAMETOOLONG: 36, ELOOP: 40, EOPNOTSUPP: 95, EPFNOSUPPORT: 96, ECONNRESET: 104, ENOBUFS: 105, EAFNOSUPPORT: 97, EPROTOTYPE: 91, ENOTSOCK: 88, ENOPROTOOPT: 92, ESHUTDOWN: 108, ECONNREFUSED: 111, EADDRINUSE: 98, ECONNABORTED: 103, ENETUNREACH: 101, ENETDOWN: 100, ETIMEDOUT: 110, EHOSTDOWN: 112, EHOSTUNREACH: 113, EINPROGRESS: 115, EALREADY: 114, EDESTADDRREQ: 89, EMSGSIZE: 90, EPROTONOSUPPORT: 93, ESOCKTNOSUPPORT: 94, EADDRNOTAVAIL: 99, ENETRESET: 102, EISCONN: 106, ENOTCONN: 107, ETOOMANYREFS: 109, EUSERS: 87, EDQUOT: 122, ESTALE: 116, ENOTSUP: 95, ENOMEDIUM: 123, EILSEQ: 84, EOVERFLOW: 75, ECANCELED: 125, ENOTRECOVERABLE: 131, EOWNERDEAD: 130, ESTRPIPE: 86}; function ___setErrNo(value) {
                        if (Module['___errno_location'])HEAP32[Module['___errno_location']()>>2]=value; return value;
                    } function ___map_file(pathname, size) {
                        ___setErrNo(ERRNO_CODES.EPERM); return -1;
                    } const ERRNO_MESSAGES={0: 'Success', 1: 'Not super-user', 2: 'No such file or directory', 3: 'No such process', 4: 'Interrupted system call', 5: 'I/O error', 6: 'No such device or address', 7: 'Arg list too long', 8: 'Exec format error', 9: 'Bad file number', 10: 'No children', 11: 'No more processes', 12: 'Not enough core', 13: 'Permission denied', 14: 'Bad address', 15: 'Block device required', 16: 'Mount device busy', 17: 'File exists', 18: 'Cross-device link', 19: 'No such device', 20: 'Not a directory', 21: 'Is a directory', 22: 'Invalid argument', 23: 'Too many open files in system', 24: 'Too many open files', 25: 'Not a typewriter', 26: 'Text file busy', 27: 'File too large', 28: 'No space left on device', 29: 'Illegal seek', 30: 'Read only file system', 31: 'Too many links', 32: 'Broken pipe', 33: 'Math arg out of domain of func', 34: 'Math result not representable', 35: 'File locking deadlock error', 36: 'File or path name too long', 37: 'No record locks available', 38: 'Function not implemented', 39: 'Directory not empty', 40: 'Too many symbolic links', 42: 'No message of desired type', 43: 'Identifier removed', 44: 'Channel number out of range', 45: 'Level 2 not synchronized', 46: 'Level 3 halted', 47: 'Level 3 reset', 48: 'Link number out of range', 49: 'Protocol driver not attached', 50: 'No CSI structure available', 51: 'Level 2 halted', 52: 'Invalid exchange', 53: 'Invalid request descriptor', 54: 'Exchange full', 55: 'No anode', 56: 'Invalid request code', 57: 'Invalid slot', 59: 'Bad font file fmt', 60: 'Device not a stream', 61: 'No data (for no delay io)', 62: 'Timer expired', 63: 'Out of streams resources', 64: 'Machine is not on the network', 65: 'Package not installed', 66: 'The object is remote', 67: 'The link has been severed', 68: 'Advertise error', 69: 'Srmount error', 70: 'Communication error on send', 71: 'Protocol error', 72: 'Multihop attempted', 73: 'Cross mount point (not really error)', 74: 'Trying to read unreadable message', 75: 'Value too large for defined data type', 76: 'Given log. name not unique', 77: 'f.d. invalid for this operation', 78: 'Remote address changed', 79: 'Can   access a needed shared lib', 80: 'Accessing a corrupted shared lib', 81: '.lib section in a.out corrupted', 82: 'Attempting to link in too many libs', 83: 'Attempting to exec a shared library', 84: 'Illegal byte sequence', 86: 'Streams pipe error', 87: 'Too many users', 88: 'Socket operation on non-socket', 89: 'Destination address required', 90: 'Message too long', 91: 'Protocol wrong type for socket', 92: 'Protocol not available', 93: 'Unknown protocol', 94: 'Socket type not supported', 95: 'Not supported', 96: 'Protocol family not supported', 97: 'Address family not supported by protocol family', 98: 'Address already in use', 99: 'Address not available', 100: 'Network interface is not configured', 101: 'Network is unreachable', 102: 'Connection reset by network', 103: 'Connection aborted', 104: 'Connection reset by peer', 105: 'No buffer space available', 106: 'Socket is already connected', 107: 'Socket is not connected', 108: 'Can\'t send after socket shutdown', 109: 'Too many references', 110: 'Connection timed out', 111: 'Connection refused', 112: 'Host is down', 113: 'Host is unreachable', 114: 'Socket already connected', 115: 'Connection already in progress', 116: 'Stale file handle', 122: 'Quota exceeded', 123: 'No medium (in tape drive)', 125: 'Operation canceled', 130: 'Previous owner died', 131: 'State not recoverable'}; var PATH={splitPath: (function(filename) {
                        const splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/; return splitPathRe.exec(filename).slice(1);
                    }), normalizeArray: (function(parts, allowAboveRoot) {
                        let up=0; for (let i=parts.length-1; i>=0; i--) {
                            const last=parts[i]; if (last==='.') {
                                parts.splice(i, 1);
                            } else if (last==='..') {
                                parts.splice(i, 1); up++;
                            } else if (up) {
                                parts.splice(i, 1); up--;
                            }
                        } if (allowAboveRoot) {
                            for (;up; up--) {
                                parts.unshift('..');
                            }
                        } return parts;
                    }), normalize: (function(path) {
                        const isAbsolute=path.charAt(0)==='/'; const trailingSlash=path.substr(-1)==='/'; path=PATH.normalizeArray(path.split('/').filter((function(p) {
                            return !!p;
                        })), !isAbsolute).join('/'); if (!path&&!isAbsolute) {
                            path='.';
                        } if (path&&trailingSlash) {
                            path+='/';
                        } return (isAbsolute?'/':'')+path;
                    }), dirname: (function(path) {
                        const result=PATH.splitPath(path); const root=result[0]; let dir=result[1]; if (!root&&!dir) {
                            return '.';
                        } if (dir) {
                            dir=dir.substr(0, dir.length-1);
                        } return root+dir;
                    }), basename: (function(path) {
                        if (path==='/') return '/'; const lastSlash=path.lastIndexOf('/'); if (lastSlash===-1) return path; return path.substr(lastSlash+1);
                    }), extname: (function(path) {
                        return PATH.splitPath(path)[3];
                    }), join: (function() {
                        const paths=Array.prototype.slice.call(arguments, 0); return PATH.normalize(paths.join('/'));
                    }), join2: (function(l, r) {
                        return PATH.normalize(l+'/'+r);
                    }), resolve: (function() {
                        let resolvedPath=''; let resolvedAbsolute=false; for (let i=arguments.length-1; i>=-1&&!resolvedAbsolute; i--) {
                            const path=i>=0?arguments[i]:FS.cwd(); if (typeof path!=='string') {
                                throw new TypeError('Arguments to path.resolve must be strings');
                            } else if (!path) {
                                return '';
                            }resolvedPath=path+'/'+resolvedPath; resolvedAbsolute=path.charAt(0)==='/';
                        }resolvedPath=PATH.normalizeArray(resolvedPath.split('/').filter((function(p) {
                            return !!p;
                        })), !resolvedAbsolute).join('/'); return (resolvedAbsolute?'/':'')+resolvedPath||'.';
                    }), relative: (function(from, to) {
                        from=PATH.resolve(from).substr(1); to=PATH.resolve(to).substr(1); function trim(arr) {
                            let start=0; for (;start<arr.length; start++) {
                                if (arr[start]!=='') break;
                            } let end=arr.length-1; for (;end>=0; end--) {
                                if (arr[end]!=='') break;
                            } if (start>end) return []; return arr.slice(start, end-start+1);
                        } const fromParts=trim(from.split('/')); const toParts=trim(to.split('/')); const length=Math.min(fromParts.length, toParts.length); let samePartsLength=length; for (var i=0; i<length; i++) {
                            if (fromParts[i]!==toParts[i]) {
                                samePartsLength=i; break;
                            }
                        } let outputParts=[]; for (var i=samePartsLength; i<fromParts.length; i++) {
                            outputParts.push('..');
                        }outputParts=outputParts.concat(toParts.slice(samePartsLength)); return outputParts.join('/');
                    })}; var TTY={ttys: [], init: (function() {}), shutdown: (function() {}), register: (function(dev, ops) {
                        TTY.ttys[dev]={input: [], output: [], ops: ops}; FS.registerDevice(dev, TTY.stream_ops);
                    }), stream_ops: {open: (function(stream) {
                        const tty=TTY.ttys[stream.node.rdev]; if (!tty) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
                        }stream.tty=tty; stream.seekable=false;
                    }), close: (function(stream) {
                        stream.tty.ops.flush(stream.tty);
                    }), flush: (function(stream) {
                        stream.tty.ops.flush(stream.tty);
                    }), read: (function(stream, buffer, offset, length, pos) {
                        if (!stream.tty||!stream.tty.ops.get_char) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
                        } let bytesRead=0; for (let i=0; i<length; i++) {
                            var result; try {
                                result=stream.tty.ops.get_char(stream.tty);
                            } catch (e) {
                                throw new FS.ErrnoError(ERRNO_CODES.EIO);
                            } if (result===undefined&&bytesRead===0) {
                                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
                            } if (result===null||result===undefined) break; bytesRead++; buffer[offset+i]=result;
                        } if (bytesRead) {
                            stream.node.timestamp=Date.now();
                        } return bytesRead;
                    }), write: (function(stream, buffer, offset, length, pos) {
                        if (!stream.tty||!stream.tty.ops.put_char) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
                        } for (var i=0; i<length; i++) {
                            try {
                                stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
                            } catch (e) {
                                throw new FS.ErrnoError(ERRNO_CODES.EIO);
                            }
                        } if (length) {
                            stream.node.timestamp=Date.now();
                        } return i;
                    })}, default_tty_ops: {get_char: (function(tty) {
                        if (!tty.input.length) {
                            let result=null; if (ENVIRONMENT_IS_NODE) {
                                const BUFSIZE=256; const buf=new Buffer(BUFSIZE); let bytesRead=0; const isPosixPlatform=process.platform!='win32'; let fd=process.stdin.fd; if (isPosixPlatform) {
                                    var usingDevice=false; try {
                                        fd=fs.openSync('/dev/stdin', 'r'); usingDevice=true;
                                    } catch (e) {}
                                } try {
                                    bytesRead=fs.readSync(fd, buf, 0, BUFSIZE, null);
                                } catch (e) {
                                    if (e.toString().indexOf('EOF')!=-1)bytesRead=0; else throw e;
                                } if (usingDevice) {
                                    fs.closeSync(fd);
                                } if (bytesRead>0) {
                                    result=buf.slice(0, bytesRead).toString('utf-8');
                                } else {
                                    result=null;
                                }
                            } else if (typeof window!='undefined'&&typeof window.prompt=='function') {
                                result=window.prompt('Input: '); if (result!==null) {
                                    result+='\n';
                                }
                            } else if (typeof readline=='function') {
                                result=readline(); if (result!==null) {
                                    result+='\n';
                                }
                            } if (!result) {
                                return null;
                            }tty.input=intArrayFromString(result, true);
                        } return tty.input.shift();
                    }), put_char: (function(tty, val) {
                        if (val===null||val===10) {
                            Module['print'](UTF8ArrayToString(tty.output, 0)); tty.output=[];
                        } else {
                            if (val!=0)tty.output.push(val);
                        }
                    }), flush: (function(tty) {
                        if (tty.output&&tty.output.length>0) {
                            Module['print'](UTF8ArrayToString(tty.output, 0)); tty.output=[];
                        }
                    })}, default_tty1_ops: {put_char: (function(tty, val) {
                        if (val===null||val===10) {
                            Module['printErr'](UTF8ArrayToString(tty.output, 0)); tty.output=[];
                        } else {
                            if (val!=0)tty.output.push(val);
                        }
                    }), flush: (function(tty) {
                        if (tty.output&&tty.output.length>0) {
                            Module['printErr'](UTF8ArrayToString(tty.output, 0)); tty.output=[];
                        }
                    })}}; var MEMFS={ops_table: null, mount: (function(mount) {
                        return MEMFS.createNode(null, '/', 16384|511, 0);
                    }), createNode: (function(parent, name, mode, dev) {
                        if (FS.isBlkdev(mode)||FS.isFIFO(mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                        } if (!MEMFS.ops_table) {
                            MEMFS.ops_table={dir: {node: {getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink}, stream: {llseek: MEMFS.stream_ops.llseek}}, file: {node: {getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr}, stream: {llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync}}, link: {node: {getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink}, stream: {}}, chrdev: {node: {getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr}, stream: FS.chrdev_stream_ops}};
                        } const node=FS.createNode(parent, name, mode, dev); if (FS.isDir(node.mode)) {
                            node.node_ops=MEMFS.ops_table.dir.node; node.stream_ops=MEMFS.ops_table.dir.stream; node.contents={};
                        } else if (FS.isFile(node.mode)) {
                            node.node_ops=MEMFS.ops_table.file.node; node.stream_ops=MEMFS.ops_table.file.stream; node.usedBytes=0; node.contents=null;
                        } else if (FS.isLink(node.mode)) {
                            node.node_ops=MEMFS.ops_table.link.node; node.stream_ops=MEMFS.ops_table.link.stream;
                        } else if (FS.isChrdev(node.mode)) {
                            node.node_ops=MEMFS.ops_table.chrdev.node; node.stream_ops=MEMFS.ops_table.chrdev.stream;
                        }node.timestamp=Date.now(); if (parent) {
                            parent.contents[name]=node;
                        } return node;
                    }), getFileDataAsRegularArray: (function(node) {
                        if (node.contents&&node.contents.subarray) {
                            const arr=[]; for (let i=0; i<node.usedBytes; ++i)arr.push(node.contents[i]); return arr;
                        } return node.contents;
                    }), getFileDataAsTypedArray: (function(node) {
                        if (!node.contents) return new Uint8Array; if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); return new Uint8Array(node.contents);
                    }), expandFileStorage: (function(node, newCapacity) {
                        if (node.contents&&node.contents.subarray&&newCapacity>node.contents.length) {
                            node.contents=MEMFS.getFileDataAsRegularArray(node); node.usedBytes=node.contents.length;
                        } if (!node.contents||node.contents.subarray) {
                            const prevCapacity=node.contents?node.contents.length:0; if (prevCapacity>=newCapacity) return; const CAPACITY_DOUBLING_MAX=1024*1024; newCapacity=Math.max(newCapacity, prevCapacity*(prevCapacity<CAPACITY_DOUBLING_MAX?2:1.125)|0); if (prevCapacity!=0)newCapacity=Math.max(newCapacity, 256); const oldContents=node.contents; node.contents=new Uint8Array(newCapacity); if (node.usedBytes>0)node.contents.set(oldContents.subarray(0, node.usedBytes), 0); return;
                        } if (!node.contents&&newCapacity>0)node.contents=[]; while (node.contents.length<newCapacity)node.contents.push(0);
                    }), resizeFileStorage: (function(node, newSize) {
                        if (node.usedBytes==newSize) return; if (newSize==0) {
                            node.contents=null; node.usedBytes=0; return;
                        } if (!node.contents||node.contents.subarray) {
                            const oldContents=node.contents; node.contents=new Uint8Array(new ArrayBuffer(newSize)); if (oldContents) {
                                node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
                            }node.usedBytes=newSize; return;
                        } if (!node.contents)node.contents=[]; if (node.contents.length>newSize)node.contents.length=newSize; else while (node.contents.length<newSize)node.contents.push(0); node.usedBytes=newSize;
                    }), node_ops: {getattr: (function(node) {
                        const attr={}; attr.dev=FS.isChrdev(node.mode)?node.id:1; attr.ino=node.id; attr.mode=node.mode; attr.nlink=1; attr.uid=0; attr.gid=0; attr.rdev=node.rdev; if (FS.isDir(node.mode)) {
                            attr.size=4096;
                        } else if (FS.isFile(node.mode)) {
                            attr.size=node.usedBytes;
                        } else if (FS.isLink(node.mode)) {
                            attr.size=node.link.length;
                        } else {
                            attr.size=0;
                        }attr.atime=new Date(node.timestamp); attr.mtime=new Date(node.timestamp); attr.ctime=new Date(node.timestamp); attr.blksize=4096; attr.blocks=Math.ceil(attr.size/attr.blksize); return attr;
                    }), setattr: (function(node, attr) {
                        if (attr.mode!==undefined) {
                            node.mode=attr.mode;
                        } if (attr.timestamp!==undefined) {
                            node.timestamp=attr.timestamp;
                        } if (attr.size!==undefined) {
                            MEMFS.resizeFileStorage(node, attr.size);
                        }
                    }), lookup: (function(parent, name) {
                        throw FS.genericErrors[ERRNO_CODES.ENOENT];
                    }), mknod: (function(parent, name, mode, dev) {
                        return MEMFS.createNode(parent, name, mode, dev);
                    }), rename: (function(old_node, new_dir, new_name) {
                        if (FS.isDir(old_node.mode)) {
                            let new_node; try {
                                new_node=FS.lookupNode(new_dir, new_name);
                            } catch (e) {} if (new_node) {
                                for (const i in new_node.contents) {
                                    throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
                                }
                            }
                        } delete old_node.parent.contents[old_node.name]; old_node.name=new_name; new_dir.contents[new_name]=old_node; old_node.parent=new_dir;
                    }), unlink: (function(parent, name) {
                        delete parent.contents[name];
                    }), rmdir: (function(parent, name) {
                        const node=FS.lookupNode(parent, name); for (const i in node.contents) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
                        } delete parent.contents[name];
                    }), readdir: (function(node) {
                        const entries=['.', '..']; for (const key in node.contents) {
                            if (!node.contents.hasOwnProperty(key)) {
                                continue;
                            }entries.push(key);
                        } return entries;
                    }), symlink: (function(parent, newname, oldpath) {
                        const node=MEMFS.createNode(parent, newname, 511|40960, 0); node.link=oldpath; return node;
                    }), readlink: (function(node) {
                        if (!FS.isLink(node.mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } return node.link;
                    })}, stream_ops: {read: (function(stream, buffer, offset, length, position) {
                        const contents=stream.node.contents; if (position>=stream.node.usedBytes) return 0; const size=Math.min(stream.node.usedBytes-position, length); assert(size>=0); if (size>8&&contents.subarray) {
                            buffer.set(contents.subarray(position, position+size), offset);
                        } else {
                            for (let i=0; i<size; i++)buffer[offset+i]=contents[position+i];
                        } return size;
                    }), write: (function(stream, buffer, offset, length, position, canOwn) {
                        if (!length) return 0; const node=stream.node; node.timestamp=Date.now(); if (buffer.subarray&&(!node.contents||node.contents.subarray)) {
                            if (canOwn) {
                                node.contents=buffer.subarray(offset, offset+length); node.usedBytes=length; return length;
                            } else if (node.usedBytes===0&&position===0) {
                                node.contents=new Uint8Array(buffer.subarray(offset, offset+length)); node.usedBytes=length; return length;
                            } else if (position+length<=node.usedBytes) {
                                node.contents.set(buffer.subarray(offset, offset+length), position); return length;
                            }
                        }MEMFS.expandFileStorage(node, position+length); if (node.contents.subarray&&buffer.subarray)node.contents.set(buffer.subarray(offset, offset+length), position); else {
                            for (let i=0; i<length; i++) {
                                node.contents[position+i]=buffer[offset+i];
                            }
                        }node.usedBytes=Math.max(node.usedBytes, position+length); return length;
                    }), llseek: (function(stream, offset, whence) {
                        let position=offset; if (whence===1) {
                            position+=stream.position;
                        } else if (whence===2) {
                            if (FS.isFile(stream.node.mode)) {
                                position+=stream.node.usedBytes;
                            }
                        } if (position<0) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } return position;
                    }), allocate: (function(stream, offset, length) {
                        MEMFS.expandFileStorage(stream.node, offset+length); stream.node.usedBytes=Math.max(stream.node.usedBytes, offset+length);
                    }), mmap: (function(stream, buffer, offset, length, position, prot, flags) {
                        if (!FS.isFile(stream.node.mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
                        } let ptr; let allocated; let contents=stream.node.contents; if (!(flags&2)&&(contents.buffer===buffer||contents.buffer===buffer.buffer)) {
                            allocated=false; ptr=contents.byteOffset;
                        } else {
                            if (position>0||position+length<stream.node.usedBytes) {
                                if (contents.subarray) {
                                    contents=contents.subarray(position, position+length);
                                } else {
                                    contents=Array.prototype.slice.call(contents, position, position+length);
                                }
                            }allocated=true; ptr=_malloc(length); if (!ptr) {
                                throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
                            }buffer.set(contents, ptr);
                        } return {ptr: ptr, allocated: allocated};
                    }), msync: (function(stream, buffer, offset, length, mmapFlags) {
                        if (!FS.isFile(stream.node.mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
                        } if (mmapFlags&2) {
                            return 0;
                        } const bytesWritten=MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false); return 0;
                    })}}; var IDBFS={dbs: {}, indexedDB: (function() {
                        if (typeof indexedDB!=='undefined') return indexedDB; let ret=null; if (typeof window==='object')ret=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB; assert(ret, 'IDBFS used, but indexedDB not supported'); return ret;
                    }), DB_VERSION: 21, DB_STORE_NAME: 'FILE_DATA', mount: (function(mount) {
                        return MEMFS.mount.apply(null, arguments);
                    }), syncfs: (function(mount, populate, callback) {
                        IDBFS.getLocalSet(mount, (function(err, local) {
                            if (err) return callback(err); IDBFS.getRemoteSet(mount, (function(err, remote) {
                                if (err) return callback(err); const src=populate?remote:local; const dst=populate?local:remote; IDBFS.reconcile(src, dst, callback);
                            }));
                        }));
                    }), getDB: (function(name, callback) {
                        let db=IDBFS.dbs[name]; if (db) {
                            return callback(null, db);
                        } let req; try {
                            req=IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
                        } catch (e) {
                            return callback(e);
                        } if (!req) {
                            return callback('Unable to connect to IndexedDB');
                        }req.onupgradeneeded=(function(e) {
                            const db=e.target.result; const transaction=e.target.transaction; let fileStore; if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
                                fileStore=transaction.objectStore(IDBFS.DB_STORE_NAME);
                            } else {
                                fileStore=db.createObjectStore(IDBFS.DB_STORE_NAME);
                            } if (!fileStore.indexNames.contains('timestamp')) {
                                fileStore.createIndex('timestamp', 'timestamp', {unique: false});
                            }
                        }); req.onsuccess=(function() {
                            db=req.result; IDBFS.dbs[name]=db; callback(null, db);
                        }); req.onerror=(function(e) {
                            callback(this.error); e.preventDefault();
                        });
                    }), getLocalSet: (function(mount, callback) {
                        const entries={}; function isRealDir(p) {
                            return p!=='.'&&p!=='..';
                        } function toAbsolute(root) {
                            return (function(p) {
                                return PATH.join2(root, p);
                            });
                        } const check=FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint)); while (check.length) {
                            const path=check.pop(); var stat; try {
                                stat=FS.stat(path);
                            } catch (e) {
                                return callback(e);
                            } if (FS.isDir(stat.mode)) {
                                check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
                            }entries[path]={timestamp: stat.mtime};
                        } return callback(null, {type: 'local', entries: entries});
                    }), getRemoteSet: (function(mount, callback) {
                        const entries={}; IDBFS.getDB(mount.mountpoint, (function(err, db) {
                            if (err) return callback(err); try {
                                const transaction=db.transaction([IDBFS.DB_STORE_NAME], 'readonly'); transaction.onerror=(function(e) {
                                    callback(this.error); e.preventDefault();
                                }); const store=transaction.objectStore(IDBFS.DB_STORE_NAME); const index=store.index('timestamp'); index.openKeyCursor().onsuccess=(function(event) {
                                    const cursor=event.target.result; if (!cursor) {
                                        return callback(null, {type: 'remote', db: db, entries: entries});
                                    }entries[cursor.primaryKey]={timestamp: cursor.key}; cursor.continue();
                                });
                            } catch (e) {
                                return callback(e);
                            }
                        }));
                    }), loadLocalEntry: (function(path, callback) {
                        let stat; let node; try {
                            const lookup=FS.lookupPath(path); node=lookup.node; stat=FS.stat(path);
                        } catch (e) {
                            return callback(e);
                        } if (FS.isDir(stat.mode)) {
                            return callback(null, {timestamp: stat.mtime, mode: stat.mode});
                        } else if (FS.isFile(stat.mode)) {
                            node.contents=MEMFS.getFileDataAsTypedArray(node); return callback(null, {timestamp: stat.mtime, mode: stat.mode, contents: node.contents});
                        } else {
                            return callback(new Error('node type not supported'));
                        }
                    }), storeLocalEntry: (function(path, entry, callback) {
                        try {
                            if (FS.isDir(entry.mode)) {
                                FS.mkdir(path, entry.mode);
                            } else if (FS.isFile(entry.mode)) {
                                FS.writeFile(path, entry.contents, {canOwn: true});
                            } else {
                                return callback(new Error('node type not supported'));
                            }FS.chmod(path, entry.mode); FS.utime(path, entry.timestamp, entry.timestamp);
                        } catch (e) {
                            return callback(e);
                        }callback(null);
                    }), removeLocalEntry: (function(path, callback) {
                        try {
                            const lookup=FS.lookupPath(path); const stat=FS.stat(path); if (FS.isDir(stat.mode)) {
                                FS.rmdir(path);
                            } else if (FS.isFile(stat.mode)) {
                                FS.unlink(path);
                            }
                        } catch (e) {
                            return callback(e);
                        }callback(null);
                    }), loadRemoteEntry: (function(store, path, callback) {
                        const req=store.get(path); req.onsuccess=(function(event) {
                            callback(null, event.target.result);
                        }); req.onerror=(function(e) {
                            callback(this.error); e.preventDefault();
                        });
                    }), storeRemoteEntry: (function(store, path, entry, callback) {
                        const req=store.put(entry, path); req.onsuccess=(function() {
                            callback(null);
                        }); req.onerror=(function(e) {
                            callback(this.error); e.preventDefault();
                        });
                    }), removeRemoteEntry: (function(store, path, callback) {
                        const req=store.delete(path); req.onsuccess=(function() {
                            callback(null);
                        }); req.onerror=(function(e) {
                            callback(this.error); e.preventDefault();
                        });
                    }), reconcile: (function(src, dst, callback) {
                        let total=0; const create=[]; Object.keys(src.entries).forEach((function(key) {
                            const e=src.entries[key]; const e2=dst.entries[key]; if (!e2||e.timestamp>e2.timestamp) {
                                create.push(key); total++;
                            }
                        })); const remove=[]; Object.keys(dst.entries).forEach((function(key) {
                            const e=dst.entries[key]; const e2=src.entries[key]; if (!e2) {
                                remove.push(key); total++;
                            }
                        })); if (!total) {
                            return callback(null);
                        } let completed=0; const db=src.type==='remote'?src.db:dst.db; const transaction=db.transaction([IDBFS.DB_STORE_NAME], 'readwrite'); const store=transaction.objectStore(IDBFS.DB_STORE_NAME); function done(err) {
                            if (err) {
                                if (!done.errored) {
                                    done.errored=true; return callback(err);
                                } return;
                            } if (++completed>=total) {
                                return callback(null);
                            }
                        }transaction.onerror=(function(e) {
                            done(this.error); e.preventDefault();
                        }); create.sort().forEach((function(path) {
                            if (dst.type==='local') {
                                IDBFS.loadRemoteEntry(store, path, (function(err, entry) {
                                    if (err) return done(err); IDBFS.storeLocalEntry(path, entry, done);
                                }));
                            } else {
                                IDBFS.loadLocalEntry(path, (function(err, entry) {
                                    if (err) return done(err); IDBFS.storeRemoteEntry(store, path, entry, done);
                                }));
                            }
                        })); remove.sort().reverse().forEach((function(path) {
                            if (dst.type==='local') {
                                IDBFS.removeLocalEntry(path, done);
                            } else {
                                IDBFS.removeRemoteEntry(store, path, done);
                            }
                        }));
                    })}; var NODEFS={isWindows: false, staticInit: (function() {
                        NODEFS.isWindows=!!process.platform.match(/^win/); let flags=process['binding']('constants'); if (flags['fs']) {
                            flags=flags['fs'];
                        }NODEFS.flagsForNodeMap={'1024': flags['O_APPEND'], '64': flags['O_CREAT'], '128': flags['O_EXCL'], '0': flags['O_RDONLY'], '2': flags['O_RDWR'], '4096': flags['O_SYNC'], '512': flags['O_TRUNC'], '1': flags['O_WRONLY']};
                    }), bufferFrom: (function(arrayBuffer) {
                        return Buffer.alloc?Buffer.from(arrayBuffer):new Buffer(arrayBuffer);
                    }), mount: (function(mount) {
                        assert(ENVIRONMENT_IS_NODE); return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
                    }), createNode: (function(parent, name, mode, dev) {
                        if (!FS.isDir(mode)&&!FS.isFile(mode)&&!FS.isLink(mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } const node=FS.createNode(parent, name, mode); node.node_ops=NODEFS.node_ops; node.stream_ops=NODEFS.stream_ops; return node;
                    }), getMode: (function(path) {
                        let stat; try {
                            stat=fs.lstatSync(path); if (NODEFS.isWindows) {
                                stat.mode=stat.mode|(stat.mode&292)>>2;
                            }
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        } return stat.mode;
                    }), realPath: (function(node) {
                        const parts=[]; while (node.parent!==node) {
                            parts.push(node.name); node=node.parent;
                        }parts.push(node.mount.opts.root); parts.reverse(); return PATH.join.apply(null, parts);
                    }), flagsForNode: (function(flags) {
                        flags&=~2097152; flags&=~2048; flags&=~32768; flags&=~524288; let newFlags=0; for (const k in NODEFS.flagsForNodeMap) {
                            if (flags&k) {
                                newFlags|=NODEFS.flagsForNodeMap[k]; flags^=k;
                            }
                        } if (!flags) {
                            return newFlags;
                        } else {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        }
                    }), node_ops: {getattr: (function(node) {
                        const path=NODEFS.realPath(node); let stat; try {
                            stat=fs.lstatSync(path);
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        } if (NODEFS.isWindows&&!stat.blksize) {
                            stat.blksize=4096;
                        } if (NODEFS.isWindows&&!stat.blocks) {
                            stat.blocks=(stat.size+stat.blksize-1)/stat.blksize|0;
                        } return {dev: stat.dev, ino: stat.ino, mode: stat.mode, nlink: stat.nlink, uid: stat.uid, gid: stat.gid, rdev: stat.rdev, size: stat.size, atime: stat.atime, mtime: stat.mtime, ctime: stat.ctime, blksize: stat.blksize, blocks: stat.blocks};
                    }), setattr: (function(node, attr) {
                        const path=NODEFS.realPath(node); try {
                            if (attr.mode!==undefined) {
                                fs.chmodSync(path, attr.mode); node.mode=attr.mode;
                            } if (attr.timestamp!==undefined) {
                                const date=new Date(attr.timestamp); fs.utimesSync(path, date, date);
                            } if (attr.size!==undefined) {
                                fs.truncateSync(path, attr.size);
                            }
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        }
                    }), lookup: (function(parent, name) {
                        const path=PATH.join2(NODEFS.realPath(parent), name); const mode=NODEFS.getMode(path); return NODEFS.createNode(parent, name, mode);
                    }), mknod: (function(parent, name, mode, dev) {
                        const node=NODEFS.createNode(parent, name, mode, dev); const path=NODEFS.realPath(node); try {
                            if (FS.isDir(node.mode)) {
                                fs.mkdirSync(path, node.mode);
                            } else {
                                fs.writeFileSync(path, '', {mode: node.mode});
                            }
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        } return node;
                    }), rename: (function(oldNode, newDir, newName) {
                        const oldPath=NODEFS.realPath(oldNode); const newPath=PATH.join2(NODEFS.realPath(newDir), newName); try {
                            fs.renameSync(oldPath, newPath);
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        }
                    }), unlink: (function(parent, name) {
                        const path=PATH.join2(NODEFS.realPath(parent), name); try {
                            fs.unlinkSync(path);
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        }
                    }), rmdir: (function(parent, name) {
                        const path=PATH.join2(NODEFS.realPath(parent), name); try {
                            fs.rmdirSync(path);
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        }
                    }), readdir: (function(node) {
                        const path=NODEFS.realPath(node); try {
                            return fs.readdirSync(path);
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        }
                    }), symlink: (function(parent, newName, oldPath) {
                        const newPath=PATH.join2(NODEFS.realPath(parent), newName); try {
                            fs.symlinkSync(oldPath, newPath);
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        }
                    }), readlink: (function(node) {
                        let path=NODEFS.realPath(node); try {
                            path=fs.readlinkSync(path); path=NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path); return path;
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        }
                    })}, stream_ops: {open: (function(stream) {
                        const path=NODEFS.realPath(stream.node); try {
                            if (FS.isFile(stream.node.mode)) {
                                stream.nfd=fs.openSync(path, NODEFS.flagsForNode(stream.flags));
                            }
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        }
                    }), close: (function(stream) {
                        try {
                            if (FS.isFile(stream.node.mode)&&stream.nfd) {
                                fs.closeSync(stream.nfd);
                            }
                        } catch (e) {
                            if (!e.code) throw e; throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        }
                    }), read: (function(stream, buffer, offset, length, position) {
                        if (length===0) return 0; try {
                            return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
                        } catch (e) {
                            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        }
                    }), write: (function(stream, buffer, offset, length, position) {
                        try {
                            return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
                        } catch (e) {
                            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                        }
                    }), llseek: (function(stream, offset, whence) {
                        let position=offset; if (whence===1) {
                            position+=stream.position;
                        } else if (whence===2) {
                            if (FS.isFile(stream.node.mode)) {
                                try {
                                    const stat=fs.fstatSync(stream.nfd); position+=stat.size;
                                } catch (e) {
                                    throw new FS.ErrnoError(ERRNO_CODES[e.code]);
                                }
                            }
                        } if (position<0) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } return position;
                    })}}; var WORKERFS={DIR_MODE: 16895, FILE_MODE: 33279, reader: null, mount: (function(mount) {
                        assert(ENVIRONMENT_IS_WORKER); if (!WORKERFS.reader)WORKERFS.reader=new FileReaderSync; const root=WORKERFS.createNode(null, '/', WORKERFS.DIR_MODE, 0); const createdParents={}; function ensureParent(path) {
                            const parts=path.split('/'); let parent=root; for (let i=0; i<parts.length-1; i++) {
                                const curr=parts.slice(0, i+1).join('/'); if (!createdParents[curr]) {
                                    createdParents[curr]=WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0);
                                }parent=createdParents[curr];
                            } return parent;
                        } function base(path) {
                            const parts=path.split('/'); return parts[parts.length-1];
                        }Array.prototype.forEach.call(mount.opts['files']||[], (function(file) {
                            WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
                        })); (mount.opts['blobs']||[]).forEach((function(obj) {
                            WORKERFS.createNode(ensureParent(obj['name']), base(obj['name']), WORKERFS.FILE_MODE, 0, obj['data']);
                        })); (mount.opts['packages']||[]).forEach((function(pack) {
                            pack['metadata'].files.forEach((function(file) {
                                const name=file.filename.substr(1); WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack['blob'].slice(file.start, file.end));
                            }));
                        })); return root;
                    }), createNode: (function(parent, name, mode, dev, contents, mtime) {
                        const node=FS.createNode(parent, name, mode); node.mode=mode; node.node_ops=WORKERFS.node_ops; node.stream_ops=WORKERFS.stream_ops; node.timestamp=(mtime||new Date).getTime(); assert(WORKERFS.FILE_MODE!==WORKERFS.DIR_MODE); if (mode===WORKERFS.FILE_MODE) {
                            node.size=contents.size; node.contents=contents;
                        } else {
                            node.size=4096; node.contents={};
                        } if (parent) {
                            parent.contents[name]=node;
                        } return node;
                    }), node_ops: {getattr: (function(node) {
                        return {dev: 1, ino: undefined, mode: node.mode, nlink: 1, uid: 0, gid: 0, rdev: undefined, size: node.size, atime: new Date(node.timestamp), mtime: new Date(node.timestamp), ctime: new Date(node.timestamp), blksize: 4096, blocks: Math.ceil(node.size/4096)};
                    }), setattr: (function(node, attr) {
                        if (attr.mode!==undefined) {
                            node.mode=attr.mode;
                        } if (attr.timestamp!==undefined) {
                            node.timestamp=attr.timestamp;
                        }
                    }), lookup: (function(parent, name) {
                        throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
                    }), mknod: (function(parent, name, mode, dev) {
                        throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                    }), rename: (function(oldNode, newDir, newName) {
                        throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                    }), unlink: (function(parent, name) {
                        throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                    }), rmdir: (function(parent, name) {
                        throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                    }), readdir: (function(node) {
                        const entries=['.', '..']; for (const key in node.contents) {
                            if (!node.contents.hasOwnProperty(key)) {
                                continue;
                            }entries.push(key);
                        } return entries;
                    }), symlink: (function(parent, newName, oldPath) {
                        throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                    }), readlink: (function(node) {
                        throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                    })}, stream_ops: {read: (function(stream, buffer, offset, length, position) {
                        if (position>=stream.node.size) return 0; const chunk=stream.node.contents.slice(position, position+length); const ab=WORKERFS.reader.readAsArrayBuffer(chunk); buffer.set(new Uint8Array(ab), offset); return chunk.size;
                    }), write: (function(stream, buffer, offset, length, position) {
                        throw new FS.ErrnoError(ERRNO_CODES.EIO);
                    }), llseek: (function(stream, offset, whence) {
                        let position=offset; if (whence===1) {
                            position+=stream.position;
                        } else if (whence===2) {
                            if (FS.isFile(stream.node.mode)) {
                                position+=stream.node.size;
                            }
                        } if (position<0) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } return position;
                    })}}; STATICTOP+=16; STATICTOP+=16; STATICTOP+=16; var FS={root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: '/', initialized: false, ignorePermissions: true, trackingDelegate: {}, tracking: {openFlags: {READ: 1, WRITE: 2}}, ErrnoError: null, genericErrors: {}, filesystems: null, syncFSRequests: 0, handleFSError: (function(e) {
                        if (!(e instanceof FS.ErrnoError)) throw e+' : '+stackTrace(); return ___setErrNo(e.errno);
                    }), lookupPath: (function(path, opts) {
                        path=PATH.resolve(FS.cwd(), path); opts=opts||{}; if (!path) return {path: '', node: null}; const defaults={follow_mount: true, recurse_count: 0}; for (const key in defaults) {
                            if (opts[key]===undefined) {
                                opts[key]=defaults[key];
                            }
                        } if (opts.recurse_count>8) {
                            throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
                        } const parts=PATH.normalizeArray(path.split('/').filter((function(p) {
                            return !!p;
                        })), false); let current=FS.root; let current_path='/'; for (let i=0; i<parts.length; i++) {
                            const islast=i===parts.length-1; if (islast&&opts.parent) {
                                break;
                            }current=FS.lookupNode(current, parts[i]); current_path=PATH.join2(current_path, parts[i]); if (FS.isMountpoint(current)) {
                                if (!islast||islast&&opts.follow_mount) {
                                    current=current.mounted.root;
                                }
                            } if (!islast||opts.follow) {
                                let count=0; while (FS.isLink(current.mode)) {
                                    const link=FS.readlink(current_path); current_path=PATH.resolve(PATH.dirname(current_path), link); const lookup=FS.lookupPath(current_path, {recurse_count: opts.recurse_count}); current=lookup.node; if (count++>40) {
                                        throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
                                    }
                                }
                            }
                        } return {path: current_path, node: current};
                    }), getPath: (function(node) {
                        let path; while (true) {
                            if (FS.isRoot(node)) {
                                const mount=node.mount.mountpoint; if (!path) return mount; return mount[mount.length-1]!=='/'?mount+'/'+path:mount+path;
                            }path=path?node.name+'/'+path:node.name; node=node.parent;
                        }
                    }), hashName: (function(parentid, name) {
                        let hash=0; for (let i=0; i<name.length; i++) {
                            hash=(hash<<5)-hash+name.charCodeAt(i)|0;
                        } return (parentid+hash>>>0)%FS.nameTable.length;
                    }), hashAddNode: (function(node) {
                        const hash=FS.hashName(node.parent.id, node.name); node.name_next=FS.nameTable[hash]; FS.nameTable[hash]=node;
                    }), hashRemoveNode: (function(node) {
                        const hash=FS.hashName(node.parent.id, node.name); if (FS.nameTable[hash]===node) {
                            FS.nameTable[hash]=node.name_next;
                        } else {
                            let current=FS.nameTable[hash]; while (current) {
                                if (current.name_next===node) {
                                    current.name_next=node.name_next; break;
                                }current=current.name_next;
                            }
                        }
                    }), lookupNode: (function(parent, name) {
                        const err=FS.mayLookup(parent); if (err) {
                            throw new FS.ErrnoError(err, parent);
                        } const hash=FS.hashName(parent.id, name); for (let node=FS.nameTable[hash]; node; node=node.name_next) {
                            const nodeName=node.name; if (node.parent.id===parent.id&&nodeName===name) {
                                return node;
                            }
                        } return FS.lookup(parent, name);
                    }), createNode: (function(parent, name, mode, rdev) {
                        if (!FS.FSNode) {
                            FS.FSNode=(function(parent, name, mode, rdev) {
                                if (!parent) {
                                    parent=this;
                                } this.parent=parent; this.mount=parent.mount; this.mounted=null; this.id=FS.nextInode++; this.name=name; this.mode=mode; this.node_ops={}; this.stream_ops={}; this.rdev=rdev;
                            }); FS.FSNode.prototype={}; const readMode=292|73; const writeMode=146; Object.defineProperties(FS.FSNode.prototype, {read: {get: (function() {
                                return (this.mode&readMode)===readMode;
                            }), set: (function(val) {
                                val?this.mode|=readMode:this.mode&=~readMode;
                            })}, write: {get: (function() {
                                return (this.mode&writeMode)===writeMode;
                            }), set: (function(val) {
                                val?this.mode|=writeMode:this.mode&=~writeMode;
                            })}, isFolder: {get: (function() {
                                return FS.isDir(this.mode);
                            })}, isDevice: {get: (function() {
                                return FS.isChrdev(this.mode);
                            })}});
                        } const node=new FS.FSNode(parent, name, mode, rdev); FS.hashAddNode(node); return node;
                    }), destroyNode: (function(node) {
                        FS.hashRemoveNode(node);
                    }), isRoot: (function(node) {
                        return node===node.parent;
                    }), isMountpoint: (function(node) {
                        return !!node.mounted;
                    }), isFile: (function(mode) {
                        return (mode&61440)===32768;
                    }), isDir: (function(mode) {
                        return (mode&61440)===16384;
                    }), isLink: (function(mode) {
                        return (mode&61440)===40960;
                    }), isChrdev: (function(mode) {
                        return (mode&61440)===8192;
                    }), isBlkdev: (function(mode) {
                        return (mode&61440)===24576;
                    }), isFIFO: (function(mode) {
                        return (mode&61440)===4096;
                    }), isSocket: (function(mode) {
                        return (mode&49152)===49152;
                    }), flagModes: {'r': 0, 'rs': 1052672, 'r+': 2, 'w': 577, 'wx': 705, 'xw': 705, 'w+': 578, 'wx+': 706, 'xw+': 706, 'a': 1089, 'ax': 1217, 'xa': 1217, 'a+': 1090, 'ax+': 1218, 'xa+': 1218}, modeStringToFlags: (function(str) {
                        const flags=FS.flagModes[str]; if (typeof flags==='undefined') {
                            throw new Error('Unknown file open mode: '+str);
                        } return flags;
                    }), flagsToPermissionString: (function(flag) {
                        let perms=['r', 'w', 'rw'][flag&3]; if (flag&512) {
                            perms+='w';
                        } return perms;
                    }), nodePermissions: (function(node, perms) {
                        if (FS.ignorePermissions) {
                            return 0;
                        } if (perms.indexOf('r')!==-1&&!(node.mode&292)) {
                            return ERRNO_CODES.EACCES;
                        } else if (perms.indexOf('w')!==-1&&!(node.mode&146)) {
                            return ERRNO_CODES.EACCES;
                        } else if (perms.indexOf('x')!==-1&&!(node.mode&73)) {
                            return ERRNO_CODES.EACCES;
                        } return 0;
                    }), mayLookup: (function(dir) {
                        const err=FS.nodePermissions(dir, 'x'); if (err) return err; if (!dir.node_ops.lookup) return ERRNO_CODES.EACCES; return 0;
                    }), mayCreate: (function(dir, name) {
                        try {
                            const node=FS.lookupNode(dir, name); return ERRNO_CODES.EEXIST;
                        } catch (e) {} return FS.nodePermissions(dir, 'wx');
                    }), mayDelete: (function(dir, name, isdir) {
                        let node; try {
                            node=FS.lookupNode(dir, name);
                        } catch (e) {
                            return e.errno;
                        } const err=FS.nodePermissions(dir, 'wx'); if (err) {
                            return err;
                        } if (isdir) {
                            if (!FS.isDir(node.mode)) {
                                return ERRNO_CODES.ENOTDIR;
                            } if (FS.isRoot(node)||FS.getPath(node)===FS.cwd()) {
                                return ERRNO_CODES.EBUSY;
                            }
                        } else {
                            if (FS.isDir(node.mode)) {
                                return ERRNO_CODES.EISDIR;
                            }
                        } return 0;
                    }), mayOpen: (function(node, flags) {
                        if (!node) {
                            return ERRNO_CODES.ENOENT;
                        } if (FS.isLink(node.mode)) {
                            return ERRNO_CODES.ELOOP;
                        } else if (FS.isDir(node.mode)) {
                            if (FS.flagsToPermissionString(flags)!=='r'||flags&512) {
                                return ERRNO_CODES.EISDIR;
                            }
                        } return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
                    }), MAX_OPEN_FDS: 4096, nextfd: (function(fd_start, fd_end) {
                        fd_start=fd_start||0; fd_end=fd_end||FS.MAX_OPEN_FDS; for (let fd=fd_start; fd<=fd_end; fd++) {
                            if (!FS.streams[fd]) {
                                return fd;
                            }
                        } throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
                    }), getStream: (function(fd) {
                        return FS.streams[fd];
                    }), createStream: (function(stream, fd_start, fd_end) {
                        if (!FS.FSStream) {
                            FS.FSStream=(function() {}); FS.FSStream.prototype={}; Object.defineProperties(FS.FSStream.prototype, {object: {get: (function() {
                                return this.node;
                            }), set: (function(val) {
                                this.node=val;
                            })}, isRead: {get: (function() {
                                return (this.flags&2097155)!==1;
                            })}, isWrite: {get: (function() {
                                return (this.flags&2097155)!==0;
                            })}, isAppend: {get: (function() {
                                return this.flags&1024;
                            })}});
                        } const newStream=new FS.FSStream; for (const p in stream) {
                            newStream[p]=stream[p];
                        }stream=newStream; const fd=FS.nextfd(fd_start, fd_end); stream.fd=fd; FS.streams[fd]=stream; return stream;
                    }), closeStream: (function(fd) {
                        FS.streams[fd]=null;
                    }), chrdev_stream_ops: {open: (function(stream) {
                        const device=FS.getDevice(stream.node.rdev); stream.stream_ops=device.stream_ops; if (stream.stream_ops.open) {
                            stream.stream_ops.open(stream);
                        }
                    }), llseek: (function() {
                        throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
                    })}, major: (function(dev) {
                        return dev>>8;
                    }), minor: (function(dev) {
                        return dev&255;
                    }), makedev: (function(ma, mi) {
                        return ma<<8|mi;
                    }), registerDevice: (function(dev, ops) {
                        FS.devices[dev]={stream_ops: ops};
                    }), getDevice: (function(dev) {
                        return FS.devices[dev];
                    }), getMounts: (function(mount) {
                        const mounts=[]; const check=[mount]; while (check.length) {
                            const m=check.pop(); mounts.push(m); check.push.apply(check, m.mounts);
                        } return mounts;
                    }), syncfs: (function(populate, callback) {
                        if (typeof populate==='function') {
                            callback=populate; populate=false;
                        }FS.syncFSRequests++; if (FS.syncFSRequests>1) {
                            console.log('warning: '+FS.syncFSRequests+' FS.syncfs operations in flight at once, probably just doing extra work');
                        } const mounts=FS.getMounts(FS.root.mount); let completed=0; function doCallback(err) {
                            assert(FS.syncFSRequests>0); FS.syncFSRequests--; return callback(err);
                        } function done(err) {
                            if (err) {
                                if (!done.errored) {
                                    done.errored=true; return doCallback(err);
                                } return;
                            } if (++completed>=mounts.length) {
                                doCallback(null);
                            }
                        }mounts.forEach((function(mount) {
                            if (!mount.type.syncfs) {
                                return done(null);
                            }mount.type.syncfs(mount, populate, done);
                        }));
                    }), mount: (function(type, opts, mountpoint) {
                        const root=mountpoint==='/'; const pseudo=!mountpoint; let node; if (root&&FS.root) {
                            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
                        } else if (!root&&!pseudo) {
                            const lookup=FS.lookupPath(mountpoint, {follow_mount: false}); mountpoint=lookup.path; node=lookup.node; if (FS.isMountpoint(node)) {
                                throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
                            } if (!FS.isDir(node.mode)) {
                                throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
                            }
                        } const mount={type: type, opts: opts, mountpoint: mountpoint, mounts: []}; const mountRoot=type.mount(mount); mountRoot.mount=mount; mount.root=mountRoot; if (root) {
                            FS.root=mountRoot;
                        } else if (node) {
                            node.mounted=mount; if (node.mount) {
                                node.mount.mounts.push(mount);
                            }
                        } return mountRoot;
                    }), unmount: (function(mountpoint) {
                        const lookup=FS.lookupPath(mountpoint, {follow_mount: false}); if (!FS.isMountpoint(lookup.node)) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } const node=lookup.node; const mount=node.mounted; const mounts=FS.getMounts(mount); Object.keys(FS.nameTable).forEach((function(hash) {
                            let current=FS.nameTable[hash]; while (current) {
                                const next=current.name_next; if (mounts.indexOf(current.mount)!==-1) {
                                    FS.destroyNode(current);
                                }current=next;
                            }
                        })); node.mounted=null; const idx=node.mount.mounts.indexOf(mount); assert(idx!==-1); node.mount.mounts.splice(idx, 1);
                    }), lookup: (function(parent, name) {
                        return parent.node_ops.lookup(parent, name);
                    }), mknod: (function(path, mode, dev) {
                        const lookup=FS.lookupPath(path, {parent: true}); const parent=lookup.node; const name=PATH.basename(path); if (!name||name==='.'||name==='..') {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } const err=FS.mayCreate(parent, name); if (err) {
                            throw new FS.ErrnoError(err);
                        } if (!parent.node_ops.mknod) {
                            throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                        } return parent.node_ops.mknod(parent, name, mode, dev);
                    }), create: (function(path, mode) {
                        mode=mode!==undefined?mode:438; mode&=4095; mode|=32768; return FS.mknod(path, mode, 0);
                    }), mkdir: (function(path, mode) {
                        mode=mode!==undefined?mode:511; mode&=511|512; mode|=16384; return FS.mknod(path, mode, 0);
                    }), mkdirTree: (function(path, mode) {
                        const dirs=path.split('/'); let d=''; for (let i=0; i<dirs.length; ++i) {
                            if (!dirs[i]) continue; d+='/'+dirs[i]; try {
                                FS.mkdir(d, mode);
                            } catch (e) {
                                if (e.errno!=ERRNO_CODES.EEXIST) throw e;
                            }
                        }
                    }), mkdev: (function(path, mode, dev) {
                        if (typeof dev==='undefined') {
                            dev=mode; mode=438;
                        }mode|=8192; return FS.mknod(path, mode, dev);
                    }), symlink: (function(oldpath, newpath) {
                        if (!PATH.resolve(oldpath)) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
                        } const lookup=FS.lookupPath(newpath, {parent: true}); const parent=lookup.node; if (!parent) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
                        } const newname=PATH.basename(newpath); const err=FS.mayCreate(parent, newname); if (err) {
                            throw new FS.ErrnoError(err);
                        } if (!parent.node_ops.symlink) {
                            throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                        } return parent.node_ops.symlink(parent, newname, oldpath);
                    }), rename: (function(old_path, new_path) {
                        const old_dirname=PATH.dirname(old_path); const new_dirname=PATH.dirname(new_path); const old_name=PATH.basename(old_path); const new_name=PATH.basename(new_path); let lookup; let old_dir; let new_dir; try {
                            lookup=FS.lookupPath(old_path, {parent: true}); old_dir=lookup.node; lookup=FS.lookupPath(new_path, {parent: true}); new_dir=lookup.node;
                        } catch (e) {
                            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
                        } if (!old_dir||!new_dir) throw new FS.ErrnoError(ERRNO_CODES.ENOENT); if (old_dir.mount!==new_dir.mount) {
                            throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
                        } const old_node=FS.lookupNode(old_dir, old_name); let relative=PATH.relative(old_path, new_dirname); if (relative.charAt(0)!=='.') {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        }relative=PATH.relative(new_path, old_dirname); if (relative.charAt(0)!=='.') {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
                        } let new_node; try {
                            new_node=FS.lookupNode(new_dir, new_name);
                        } catch (e) {} if (old_node===new_node) {
                            return;
                        } const isdir=FS.isDir(old_node.mode); let err=FS.mayDelete(old_dir, old_name, isdir); if (err) {
                            throw new FS.ErrnoError(err);
                        }err=new_node?FS.mayDelete(new_dir, new_name, isdir):FS.mayCreate(new_dir, new_name); if (err) {
                            throw new FS.ErrnoError(err);
                        } if (!old_dir.node_ops.rename) {
                            throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                        } if (FS.isMountpoint(old_node)||new_node&&FS.isMountpoint(new_node)) {
                            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
                        } if (new_dir!==old_dir) {
                            err=FS.nodePermissions(old_dir, 'w'); if (err) {
                                throw new FS.ErrnoError(err);
                            }
                        } try {
                            if (FS.trackingDelegate['willMovePath']) {
                                FS.trackingDelegate['willMovePath'](old_path, new_path);
                            }
                        } catch (e) {
                            console.log('FS.trackingDelegate[\'willMovePath\'](\''+old_path+'\', \''+new_path+'\') threw an exception: '+e.message);
                        }FS.hashRemoveNode(old_node); try {
                            old_dir.node_ops.rename(old_node, new_dir, new_name);
                        } catch (e) {
                            throw e;
                        } finally {
                            FS.hashAddNode(old_node);
                        } try {
                            if (FS.trackingDelegate['onMovePath'])FS.trackingDelegate['onMovePath'](old_path, new_path);
                        } catch (e) {
                            console.log('FS.trackingDelegate[\'onMovePath\'](\''+old_path+'\', \''+new_path+'\') threw an exception: '+e.message);
                        }
                    }), rmdir: (function(path) {
                        const lookup=FS.lookupPath(path, {parent: true}); const parent=lookup.node; const name=PATH.basename(path); const node=FS.lookupNode(parent, name); const err=FS.mayDelete(parent, name, true); if (err) {
                            throw new FS.ErrnoError(err);
                        } if (!parent.node_ops.rmdir) {
                            throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                        } if (FS.isMountpoint(node)) {
                            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
                        } try {
                            if (FS.trackingDelegate['willDeletePath']) {
                                FS.trackingDelegate['willDeletePath'](path);
                            }
                        } catch (e) {
                            console.log('FS.trackingDelegate[\'willDeletePath\'](\''+path+'\') threw an exception: '+e.message);
                        }parent.node_ops.rmdir(parent, name); FS.destroyNode(node); try {
                            if (FS.trackingDelegate['onDeletePath'])FS.trackingDelegate['onDeletePath'](path);
                        } catch (e) {
                            console.log('FS.trackingDelegate[\'onDeletePath\'](\''+path+'\') threw an exception: '+e.message);
                        }
                    }), readdir: (function(path) {
                        const lookup=FS.lookupPath(path, {follow: true}); const node=lookup.node; if (!node.node_ops.readdir) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
                        } return node.node_ops.readdir(node);
                    }), unlink: (function(path) {
                        const lookup=FS.lookupPath(path, {parent: true}); const parent=lookup.node; const name=PATH.basename(path); const node=FS.lookupNode(parent, name); const err=FS.mayDelete(parent, name, false); if (err) {
                            throw new FS.ErrnoError(err);
                        } if (!parent.node_ops.unlink) {
                            throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                        } if (FS.isMountpoint(node)) {
                            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
                        } try {
                            if (FS.trackingDelegate['willDeletePath']) {
                                FS.trackingDelegate['willDeletePath'](path);
                            }
                        } catch (e) {
                            console.log('FS.trackingDelegate[\'willDeletePath\'](\''+path+'\') threw an exception: '+e.message);
                        }parent.node_ops.unlink(parent, name); FS.destroyNode(node); try {
                            if (FS.trackingDelegate['onDeletePath'])FS.trackingDelegate['onDeletePath'](path);
                        } catch (e) {
                            console.log('FS.trackingDelegate[\'onDeletePath\'](\''+path+'\') threw an exception: '+e.message);
                        }
                    }), readlink: (function(path) {
                        const lookup=FS.lookupPath(path); const link=lookup.node; if (!link) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
                        } if (!link.node_ops.readlink) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } return PATH.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
                    }), stat: (function(path, dontFollow) {
                        const lookup=FS.lookupPath(path, {follow: !dontFollow}); const node=lookup.node; if (!node) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
                        } if (!node.node_ops.getattr) {
                            throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                        } return node.node_ops.getattr(node);
                    }), lstat: (function(path) {
                        return FS.stat(path, true);
                    }), chmod: (function(path, mode, dontFollow) {
                        let node; if (typeof path==='string') {
                            const lookup=FS.lookupPath(path, {follow: !dontFollow}); node=lookup.node;
                        } else {
                            node=path;
                        } if (!node.node_ops.setattr) {
                            throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                        }node.node_ops.setattr(node, {mode: mode&4095|node.mode&~4095, timestamp: Date.now()});
                    }), lchmod: (function(path, mode) {
                        FS.chmod(path, mode, true);
                    }), fchmod: (function(fd, mode) {
                        const stream=FS.getStream(fd); if (!stream) {
                            throw new FS.ErrnoError(ERRNO_CODES.EBADF);
                        }FS.chmod(stream.node, mode);
                    }), chown: (function(path, uid, gid, dontFollow) {
                        let node; if (typeof path==='string') {
                            const lookup=FS.lookupPath(path, {follow: !dontFollow}); node=lookup.node;
                        } else {
                            node=path;
                        } if (!node.node_ops.setattr) {
                            throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                        }node.node_ops.setattr(node, {timestamp: Date.now()});
                    }), lchown: (function(path, uid, gid) {
                        FS.chown(path, uid, gid, true);
                    }), fchown: (function(fd, uid, gid) {
                        const stream=FS.getStream(fd); if (!stream) {
                            throw new FS.ErrnoError(ERRNO_CODES.EBADF);
                        }FS.chown(stream.node, uid, gid);
                    }), truncate: (function(path, len) {
                        if (len<0) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } let node; if (typeof path==='string') {
                            const lookup=FS.lookupPath(path, {follow: true}); node=lookup.node;
                        } else {
                            node=path;
                        } if (!node.node_ops.setattr) {
                            throw new FS.ErrnoError(ERRNO_CODES.EPERM);
                        } if (FS.isDir(node.mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
                        } if (!FS.isFile(node.mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } const err=FS.nodePermissions(node, 'w'); if (err) {
                            throw new FS.ErrnoError(err);
                        }node.node_ops.setattr(node, {size: len, timestamp: Date.now()});
                    }), ftruncate: (function(fd, len) {
                        const stream=FS.getStream(fd); if (!stream) {
                            throw new FS.ErrnoError(ERRNO_CODES.EBADF);
                        } if ((stream.flags&2097155)===0) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        }FS.truncate(stream.node, len);
                    }), utime: (function(path, atime, mtime) {
                        const lookup=FS.lookupPath(path, {follow: true}); const node=lookup.node; node.node_ops.setattr(node, {timestamp: Math.max(atime, mtime)});
                    }), open: (function(path, flags, mode, fd_start, fd_end) {
                        if (path==='') {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
                        }flags=typeof flags==='string'?FS.modeStringToFlags(flags):flags; mode=typeof mode==='undefined'?438:mode; if (flags&64) {
                            mode=mode&4095|32768;
                        } else {
                            mode=0;
                        } let node; if (typeof path==='object') {
                            node=path;
                        } else {
                            path=PATH.normalize(path); try {
                                const lookup=FS.lookupPath(path, {follow: !(flags&131072)}); node=lookup.node;
                            } catch (e) {}
                        } let created=false; if (flags&64) {
                            if (node) {
                                if (flags&128) {
                                    throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
                                }
                            } else {
                                node=FS.mknod(path, mode, 0); created=true;
                            }
                        } if (!node) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
                        } if (FS.isChrdev(node.mode)) {
                            flags&=~512;
                        } if (flags&65536&&!FS.isDir(node.mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
                        } if (!created) {
                            const err=FS.mayOpen(node, flags); if (err) {
                                throw new FS.ErrnoError(err);
                            }
                        } if (flags&512) {
                            FS.truncate(node, 0);
                        }flags&=~(128|512); const stream=FS.createStream({node: node, path: FS.getPath(node), flags: flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false}, fd_start, fd_end); if (stream.stream_ops.open) {
                            stream.stream_ops.open(stream);
                        } if (Module['logReadFiles']&&!(flags&1)) {
                            if (!FS.readFiles)FS.readFiles={}; if (!(path in FS.readFiles)) {
                                FS.readFiles[path]=1; Module['printErr']('read file: '+path);
                            }
                        } try {
                            if (FS.trackingDelegate['onOpenFile']) {
                                let trackingFlags=0; if ((flags&2097155)!==1) {
                                    trackingFlags|=FS.tracking.openFlags.READ;
                                } if ((flags&2097155)!==0) {
                                    trackingFlags|=FS.tracking.openFlags.WRITE;
                                }FS.trackingDelegate['onOpenFile'](path, trackingFlags);
                            }
                        } catch (e) {
                            console.log('FS.trackingDelegate[\'onOpenFile\'](\''+path+'\', flags) threw an exception: '+e.message);
                        } return stream;
                    }), close: (function(stream) {
                        if (stream.getdents)stream.getdents=null; try {
                            if (stream.stream_ops.close) {
                                stream.stream_ops.close(stream);
                            }
                        } catch (e) {
                            throw e;
                        } finally {
                            FS.closeStream(stream.fd);
                        }
                    }), llseek: (function(stream, offset, whence) {
                        if (!stream.seekable||!stream.stream_ops.llseek) {
                            throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
                        }stream.position=stream.stream_ops.llseek(stream, offset, whence); stream.ungotten=[]; return stream.position;
                    }), read: (function(stream, buffer, offset, length, position) {
                        if (length<0||position<0) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } if ((stream.flags&2097155)===1) {
                            throw new FS.ErrnoError(ERRNO_CODES.EBADF);
                        } if (FS.isDir(stream.node.mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
                        } if (!stream.stream_ops.read) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } const seeking=typeof position!=='undefined'; if (!seeking) {
                            position=stream.position;
                        } else if (!stream.seekable) {
                            throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
                        } const bytesRead=stream.stream_ops.read(stream, buffer, offset, length, position); if (!seeking)stream.position+=bytesRead; return bytesRead;
                    }), write: (function(stream, buffer, offset, length, position, canOwn) {
                        if (length<0||position<0) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } if ((stream.flags&2097155)===0) {
                            throw new FS.ErrnoError(ERRNO_CODES.EBADF);
                        } if (FS.isDir(stream.node.mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
                        } if (!stream.stream_ops.write) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } if (stream.flags&1024) {
                            FS.llseek(stream, 0, 2);
                        } const seeking=typeof position!=='undefined'; if (!seeking) {
                            position=stream.position;
                        } else if (!stream.seekable) {
                            throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
                        } const bytesWritten=stream.stream_ops.write(stream, buffer, offset, length, position, canOwn); if (!seeking)stream.position+=bytesWritten; try {
                            if (stream.path&&FS.trackingDelegate['onWriteToFile'])FS.trackingDelegate['onWriteToFile'](stream.path);
                        } catch (e) {
                            console.log('FS.trackingDelegate[\'onWriteToFile\'](\''+path+'\') threw an exception: '+e.message);
                        } return bytesWritten;
                    }), allocate: (function(stream, offset, length) {
                        if (offset<0||length<=0) {
                            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
                        } if ((stream.flags&2097155)===0) {
                            throw new FS.ErrnoError(ERRNO_CODES.EBADF);
                        } if (!FS.isFile(stream.node.mode)&&!FS.isDir(stream.node.mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
                        } if (!stream.stream_ops.allocate) {
                            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
                        }stream.stream_ops.allocate(stream, offset, length);
                    }), mmap: (function(stream, buffer, offset, length, position, prot, flags) {
                        if ((stream.flags&2097155)===1) {
                            throw new FS.ErrnoError(ERRNO_CODES.EACCES);
                        } if (!stream.stream_ops.mmap) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
                        } return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
                    }), msync: (function(stream, buffer, offset, length, mmapFlags) {
                        if (!stream||!stream.stream_ops.msync) {
                            return 0;
                        } return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
                    }), munmap: (function(stream) {
                        return 0;
                    }), ioctl: (function(stream, cmd, arg) {
                        if (!stream.stream_ops.ioctl) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
                        } return stream.stream_ops.ioctl(stream, cmd, arg);
                    }), readFile: (function(path, opts) {
                        opts=opts||{}; opts.flags=opts.flags||'r'; opts.encoding=opts.encoding||'binary'; if (opts.encoding!=='utf8'&&opts.encoding!=='binary') {
                            throw new Error('Invalid encoding type "'+opts.encoding+'"');
                        } let ret; const stream=FS.open(path, opts.flags); const stat=FS.stat(path); const length=stat.size; const buf=new Uint8Array(length); FS.read(stream, buf, 0, length, 0); if (opts.encoding==='utf8') {
                            ret=UTF8ArrayToString(buf, 0);
                        } else if (opts.encoding==='binary') {
                            ret=buf;
                        }FS.close(stream); return ret;
                    }), writeFile: (function(path, data, opts) {
                        opts=opts||{}; opts.flags=opts.flags||'w'; const stream=FS.open(path, opts.flags, opts.mode); if (typeof data==='string') {
                            const buf=new Uint8Array(lengthBytesUTF8(data)+1); const actualNumBytes=stringToUTF8Array(data, buf, 0, buf.length); FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
                        } else if (ArrayBuffer.isView(data)) {
                            FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
                        } else {
                            throw new Error('Unsupported data type');
                        }FS.close(stream);
                    }), cwd: (function() {
                        return FS.currentPath;
                    }), chdir: (function(path) {
                        const lookup=FS.lookupPath(path, {follow: true}); if (lookup.node===null) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
                        } if (!FS.isDir(lookup.node.mode)) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
                        } const err=FS.nodePermissions(lookup.node, 'x'); if (err) {
                            throw new FS.ErrnoError(err);
                        }FS.currentPath=lookup.path;
                    }), createDefaultDirectories: (function() {
                        FS.mkdir('/tmp'); FS.mkdir('/home'); FS.mkdir('/home/web_user');
                    }), createDefaultDevices: (function() {
                        FS.mkdir('/dev'); FS.registerDevice(FS.makedev(1, 3), {read: (function() {
                            return 0;
                        }), write: (function(stream, buffer, offset, length, pos) {
                            return length;
                        })}); FS.mkdev('/dev/null', FS.makedev(1, 3)); TTY.register(FS.makedev(5, 0), TTY.default_tty_ops); TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops); FS.mkdev('/dev/tty', FS.makedev(5, 0)); FS.mkdev('/dev/tty1', FS.makedev(6, 0)); let random_device; if (typeof crypto!=='undefined') {
                            const randomBuffer=new Uint8Array(1); random_device=(function() {
                                crypto.getRandomValues(randomBuffer); return randomBuffer[0];
                            });
                        } else if (ENVIRONMENT_IS_NODE) {
                            random_device=(function() {
                                return __webpack_require__(0)['randomBytes'](1)[0];
                            });
                        } else {
                            random_device=(function() {
                                return Math.random()*256|0;
                            });
                        }FS.createDevice('/dev', 'random', random_device); FS.createDevice('/dev', 'urandom', random_device); FS.mkdir('/dev/shm'); FS.mkdir('/dev/shm/tmp');
                    }), createSpecialDirectories: (function() {
                        FS.mkdir('/proc'); FS.mkdir('/proc/self'); FS.mkdir('/proc/self/fd'); FS.mount({mount: (function() {
                            const node=FS.createNode('/proc/self', 'fd', 16384|511, 73); node.node_ops={lookup: (function(parent, name) {
                                const fd=+name; const stream=FS.getStream(fd); if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF); const ret={parent: null, mount: {mountpoint: 'fake'}, node_ops: {readlink: (function() {
                                    return stream.path;
                                })}}; ret.parent=ret; return ret;
                            })}; return node;
                        })}, {}, '/proc/self/fd');
                    }), createStandardStreams: (function() {
                        if (Module['stdin']) {
                            FS.createDevice('/dev', 'stdin', Module['stdin']);
                        } else {
                            FS.symlink('/dev/tty', '/dev/stdin');
                        } if (Module['stdout']) {
                            FS.createDevice('/dev', 'stdout', null, Module['stdout']);
                        } else {
                            FS.symlink('/dev/tty', '/dev/stdout');
                        } if (Module['stderr']) {
                            FS.createDevice('/dev', 'stderr', null, Module['stderr']);
                        } else {
                            FS.symlink('/dev/tty1', '/dev/stderr');
                        } const stdin=FS.open('/dev/stdin', 'r'); assert(stdin.fd===0, 'invalid handle for stdin ('+stdin.fd+')'); const stdout=FS.open('/dev/stdout', 'w'); assert(stdout.fd===1, 'invalid handle for stdout ('+stdout.fd+')'); const stderr=FS.open('/dev/stderr', 'w'); assert(stderr.fd===2, 'invalid handle for stderr ('+stderr.fd+')');
                    }), ensureErrnoError: (function() {
                        if (FS.ErrnoError) return; FS.ErrnoError=function ErrnoError(errno, node) {
                            this.node=node; this.setErrno=(function(errno) {
                                this.errno=errno; for (const key in ERRNO_CODES) {
                                    if (ERRNO_CODES[key]===errno) {
                                        this.code=key; break;
                                    }
                                }
                            }); this.setErrno(errno); this.message=ERRNO_MESSAGES[errno]; if (this.stack)Object.defineProperty(this, 'stack', {value: (new Error).stack, writable: true});
                        }; FS.ErrnoError.prototype=new Error; FS.ErrnoError.prototype.constructor=FS.ErrnoError; [ERRNO_CODES.ENOENT].forEach((function(code) {
                            FS.genericErrors[code]=new FS.ErrnoError(code); FS.genericErrors[code].stack='<generic error, no stack>';
                        }));
                    }), staticInit: (function() {
                        FS.ensureErrnoError(); FS.nameTable=new Array(4096); FS.mount(MEMFS, {}, '/'); FS.createDefaultDirectories(); FS.createDefaultDevices(); FS.createSpecialDirectories(); FS.filesystems={'MEMFS': MEMFS, 'IDBFS': IDBFS, 'NODEFS': NODEFS, 'WORKERFS': WORKERFS};
                    }), init: (function(input, output, error) {
                        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)'); FS.init.initialized=true; FS.ensureErrnoError(); Module['stdin']=input||Module['stdin']; Module['stdout']=output||Module['stdout']; Module['stderr']=error||Module['stderr']; FS.createStandardStreams();
                    }), quit: (function() {
                        FS.init.initialized=false; const fflush=Module['_fflush']; if (fflush)fflush(0); for (let i=0; i<FS.streams.length; i++) {
                            const stream=FS.streams[i]; if (!stream) {
                                continue;
                            }FS.close(stream);
                        }
                    }), getMode: (function(canRead, canWrite) {
                        let mode=0; if (canRead)mode|=292|73; if (canWrite)mode|=146; return mode;
                    }), joinPath: (function(parts, forceRelative) {
                        let path=PATH.join.apply(null, parts); if (forceRelative&&path[0]=='/')path=path.substr(1); return path;
                    }), absolutePath: (function(relative, base) {
                        return PATH.resolve(base, relative);
                    }), standardizePath: (function(path) {
                        return PATH.normalize(path);
                    }), findObject: (function(path, dontResolveLastLink) {
                        const ret=FS.analyzePath(path, dontResolveLastLink); if (ret.exists) {
                            return ret.object;
                        } else {
                            ___setErrNo(ret.error); return null;
                        }
                    }), analyzePath: (function(path, dontResolveLastLink) {
                        try {
                            var lookup=FS.lookupPath(path, {follow: !dontResolveLastLink}); path=lookup.path;
                        } catch (e) {} const ret={isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null}; try {
                            var lookup=FS.lookupPath(path, {parent: true}); ret.parentExists=true; ret.parentPath=lookup.path; ret.parentObject=lookup.node; ret.name=PATH.basename(path); lookup=FS.lookupPath(path, {follow: !dontResolveLastLink}); ret.exists=true; ret.path=lookup.path; ret.object=lookup.node; ret.name=lookup.node.name; ret.isRoot=lookup.path==='/';
                        } catch (e) {
                            ret.error=e.errno;
                        } return ret;
                    }), createFolder: (function(parent, name, canRead, canWrite) {
                        const path=PATH.join2(typeof parent==='string'?parent:FS.getPath(parent), name); const mode=FS.getMode(canRead, canWrite); return FS.mkdir(path, mode);
                    }), createPath: (function(parent, path, canRead, canWrite) {
                        parent=typeof parent==='string'?parent:FS.getPath(parent); const parts=path.split('/').reverse(); while (parts.length) {
                            const part=parts.pop(); if (!part) continue; var current=PATH.join2(parent, part); try {
                                FS.mkdir(current);
                            } catch (e) {}parent=current;
                        } return current;
                    }), createFile: (function(parent, name, properties, canRead, canWrite) {
                        const path=PATH.join2(typeof parent==='string'?parent:FS.getPath(parent), name); const mode=FS.getMode(canRead, canWrite); return FS.create(path, mode);
                    }), createDataFile: (function(parent, name, data, canRead, canWrite, canOwn) {
                        const path=name?PATH.join2(typeof parent==='string'?parent:FS.getPath(parent), name):parent; const mode=FS.getMode(canRead, canWrite); const node=FS.create(path, mode); if (data) {
                            if (typeof data==='string') {
                                const arr=new Array(data.length); for (let i=0, len=data.length; i<len; ++i)arr[i]=data.charCodeAt(i); data=arr;
                            }FS.chmod(node, mode|146); const stream=FS.open(node, 'w'); FS.write(stream, data, 0, data.length, 0, canOwn); FS.close(stream); FS.chmod(node, mode);
                        } return node;
                    }), createDevice: (function(parent, name, input, output) {
                        const path=PATH.join2(typeof parent==='string'?parent:FS.getPath(parent), name); const mode=FS.getMode(!!input, !!output); if (!FS.createDevice.major)FS.createDevice.major=64; const dev=FS.makedev(FS.createDevice.major++, 0); FS.registerDevice(dev, {open: (function(stream) {
                            stream.seekable=false;
                        }), close: (function(stream) {
                            if (output&&output.buffer&&output.buffer.length) {
                                output(10);
                            }
                        }), read: (function(stream, buffer, offset, length, pos) {
                            let bytesRead=0; for (let i=0; i<length; i++) {
                                var result; try {
                                    result=input();
                                } catch (e) {
                                    throw new FS.ErrnoError(ERRNO_CODES.EIO);
                                } if (result===undefined&&bytesRead===0) {
                                    throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
                                } if (result===null||result===undefined) break; bytesRead++; buffer[offset+i]=result;
                            } if (bytesRead) {
                                stream.node.timestamp=Date.now();
                            } return bytesRead;
                        }), write: (function(stream, buffer, offset, length, pos) {
                            for (var i=0; i<length; i++) {
                                try {
                                    output(buffer[offset+i]);
                                } catch (e) {
                                    throw new FS.ErrnoError(ERRNO_CODES.EIO);
                                }
                            } if (length) {
                                stream.node.timestamp=Date.now();
                            } return i;
                        })}); return FS.mkdev(path, mode, dev);
                    }), createLink: (function(parent, name, target, canRead, canWrite) {
                        const path=PATH.join2(typeof parent==='string'?parent:FS.getPath(parent), name); return FS.symlink(target, path);
                    }), forceLoadFile: (function(obj) {
                        if (obj.isDevice||obj.isFolder||obj.link||obj.contents) return true; let success=true; if (typeof XMLHttpRequest!=='undefined') {
                            throw new Error('Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.');
                        } else if (Module['read']) {
                            try {
                                obj.contents=intArrayFromString(Module['read'](obj.url), true); obj.usedBytes=obj.contents.length;
                            } catch (e) {
                                success=false;
                            }
                        } else {
                            throw new Error('Cannot load without read() or XMLHttpRequest.');
                        } if (!success)___setErrNo(ERRNO_CODES.EIO); return success;
                    }), createLazyFile: (function(parent, name, url, canRead, canWrite) {
                        function LazyUint8Array() {
                            this.lengthKnown=false; this.chunks=[];
                        }LazyUint8Array.prototype.get=function LazyUint8Array_get(idx) {
                            if (idx> this.length-1||idx<0) {
                                return undefined;
                            } const chunkOffset=idx%this.chunkSize; const chunkNum=idx/this.chunkSize|0; return this.getter(chunkNum)[chunkOffset];
                        }; LazyUint8Array.prototype.setDataGetter=function LazyUint8Array_setDataGetter(getter) {
                            this.getter=getter;
                        }; LazyUint8Array.prototype.cacheLength=function LazyUint8Array_cacheLength() {
                            const xhr=new XMLHttpRequest; xhr.open('HEAD', url, false); xhr.send(null); if (!(xhr.status>=200&&xhr.status<300||xhr.status===304)) throw new Error('Couldn\'t load '+url+'. Status: '+xhr.status); let datalength=Number(xhr.getResponseHeader('Content-length')); let header; const hasByteServing=(header=xhr.getResponseHeader('Accept-Ranges'))&&header==='bytes'; const usesGzip=(header=xhr.getResponseHeader('Content-Encoding'))&&header==='gzip'; let chunkSize=1024*1024; if (!hasByteServing)chunkSize=datalength; const doXHR=(function(from, to) {
                                if (from>to) throw new Error('invalid range ('+from+', '+to+') or no bytes requested!'); if (to>datalength-1) throw new Error('only '+datalength+' bytes available! programmer error!'); const xhr=new XMLHttpRequest; xhr.open('GET', url, false); if (datalength!==chunkSize)xhr.setRequestHeader('Range', 'bytes='+from+'-'+to); if (typeof Uint8Array!='undefined')xhr.responseType='arraybuffer'; if (xhr.overrideMimeType) {
                                    xhr.overrideMimeType('text/plain; charset=x-user-defined');
                                }xhr.send(null); if (!(xhr.status>=200&&xhr.status<300||xhr.status===304)) throw new Error('Couldn\'t load '+url+'. Status: '+xhr.status); if (xhr.response!==undefined) {
                                    return new Uint8Array(xhr.response||[]);
                                } else {
                                    return intArrayFromString(xhr.responseText||'', true);
                                }
                            }); const lazyArray=this; lazyArray.setDataGetter((function(chunkNum) {
                                const start=chunkNum*chunkSize; let end=(chunkNum+1)*chunkSize-1; end=Math.min(end, datalength-1); if (typeof lazyArray.chunks[chunkNum]==='undefined') {
                                    lazyArray.chunks[chunkNum]=doXHR(start, end);
                                } if (typeof lazyArray.chunks[chunkNum]==='undefined') throw new Error('doXHR failed!'); return lazyArray.chunks[chunkNum];
                            })); if (usesGzip||!datalength) {
                                chunkSize=datalength=1; datalength=this.getter(0).length; chunkSize=datalength; console.log('LazyFiles on gzip forces download of the whole file when length is accessed');
                            } this._length=datalength; this._chunkSize=chunkSize; this.lengthKnown=true;
                        }; if (typeof XMLHttpRequest!=='undefined') {
                            if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc'; const lazyArray=new LazyUint8Array; Object.defineProperties(lazyArray, {length: {get: (function() {
                                if (!this.lengthKnown) {
                                    this.cacheLength();
                                } return this._length;
                            })}, chunkSize: {get: (function() {
                                if (!this.lengthKnown) {
                                    this.cacheLength();
                                } return this._chunkSize;
                            })}}); var properties={isDevice: false, contents: lazyArray};
                        } else {
                            var properties={isDevice: false, url: url};
                        } const node=FS.createFile(parent, name, properties, canRead, canWrite); if (properties.contents) {
                            node.contents=properties.contents;
                        } else if (properties.url) {
                            node.contents=null; node.url=properties.url;
                        }Object.defineProperties(node, {usedBytes: {get: (function() {
                            return this.contents.length;
                        })}}); const stream_ops={}; const keys=Object.keys(node.stream_ops); keys.forEach((function(key) {
                            const fn=node.stream_ops[key]; stream_ops[key]=function forceLoadLazyFile() {
                                if (!FS.forceLoadFile(node)) {
                                    throw new FS.ErrnoError(ERRNO_CODES.EIO);
                                } return fn.apply(null, arguments);
                            };
                        })); stream_ops.read=function stream_ops_read(stream, buffer, offset, length, position) {
                            if (!FS.forceLoadFile(node)) {
                                throw new FS.ErrnoError(ERRNO_CODES.EIO);
                            } const contents=stream.node.contents; if (position>=contents.length) return 0; const size=Math.min(contents.length-position, length); assert(size>=0); if (contents.slice) {
                                for (var i=0; i<size; i++) {
                                    buffer[offset+i]=contents[position+i];
                                }
                            } else {
                                for (var i=0; i<size; i++) {
                                    buffer[offset+i]=contents.get(position+i);
                                }
                            } return size;
                        }; node.stream_ops=stream_ops; return node;
                    }), createPreloadedFile: (function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
                        Browser.init(); const fullname=name?PATH.resolve(PATH.join2(parent, name)):parent; const dep=getUniqueRunDependency('cp '+fullname); function processData(byteArray) {
                            function finish(byteArray) {
                                if (preFinish)preFinish(); if (!dontCreateFile) {
                                    FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
                                } if (onload)onload(); removeRunDependency(dep);
                            } let handled=false; Module['preloadPlugins'].forEach((function(plugin) {
                                if (handled) return; if (plugin['canHandle'](fullname)) {
                                    plugin['handle'](byteArray, fullname, finish, (function() {
                                        if (onerror)onerror(); removeRunDependency(dep);
                                    })); handled=true;
                                }
                            })); if (!handled)finish(byteArray);
                        }addRunDependency(dep); if (typeof url=='string') {
                            Browser.asyncLoad(url, (function(byteArray) {
                                processData(byteArray);
                            }), onerror);
                        } else {
                            processData(url);
                        }
                    }), indexedDB: (function() {
                        return window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;
                    }), DB_NAME: (function() {
                        return 'EM_FS_'+window.location.pathname;
                    }), DB_VERSION: 20, DB_STORE_NAME: 'FILE_DATA', saveFilesToDB: (function(paths, onload, onerror) {
                        onload=onload||(function() {}); onerror=onerror||(function() {}); const indexedDB=FS.indexedDB(); try {
                            var openRequest=indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
                        } catch (e) {
                            return onerror(e);
                        }openRequest.onupgradeneeded=function openRequest_onupgradeneeded() {
                            console.log('creating db'); const db=openRequest.result; db.createObjectStore(FS.DB_STORE_NAME);
                        }; openRequest.onsuccess=function openRequest_onsuccess() {
                            const db=openRequest.result; const transaction=db.transaction([FS.DB_STORE_NAME], 'readwrite'); const files=transaction.objectStore(FS.DB_STORE_NAME); let ok=0; let fail=0; const total=paths.length; function finish() {
                                if (fail==0)onload(); else onerror();
                            }paths.forEach((function(path) {
                                const putRequest=files.put(FS.analyzePath(path).object.contents, path); putRequest.onsuccess=function putRequest_onsuccess() {
                                    ok++; if (ok+fail==total)finish();
                                }; putRequest.onerror=function putRequest_onerror() {
                                    fail++; if (ok+fail==total)finish();
                                };
                            })); transaction.onerror=onerror;
                        }; openRequest.onerror=onerror;
                    }), loadFilesFromDB: (function(paths, onload, onerror) {
                        onload=onload||(function() {}); onerror=onerror||(function() {}); const indexedDB=FS.indexedDB(); try {
                            var openRequest=indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
                        } catch (e) {
                            return onerror(e);
                        }openRequest.onupgradeneeded=onerror; openRequest.onsuccess=function openRequest_onsuccess() {
                            const db=openRequest.result; try {
                                var transaction=db.transaction([FS.DB_STORE_NAME], 'readonly');
                            } catch (e) {
                                onerror(e); return;
                            } const files=transaction.objectStore(FS.DB_STORE_NAME); let ok=0; let fail=0; const total=paths.length; function finish() {
                                if (fail==0)onload(); else onerror();
                            }paths.forEach((function(path) {
                                const getRequest=files.get(path); getRequest.onsuccess=function getRequest_onsuccess() {
                                    if (FS.analyzePath(path).exists) {
                                        FS.unlink(path);
                                    }FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true); ok++; if (ok+fail==total)finish();
                                }; getRequest.onerror=function getRequest_onerror() {
                                    fail++; if (ok+fail==total)finish();
                                };
                            })); transaction.onerror=onerror;
                        }; openRequest.onerror=onerror;
                    })}; var SYSCALLS={DEFAULT_POLLMASK: 5, mappings: {}, umask: 511, calculateAt: (function(dirfd, path) {
                        if (path[0]!=='/') {
                            let dir; if (dirfd===-100) {
                                dir=FS.cwd();
                            } else {
                                const dirstream=FS.getStream(dirfd); if (!dirstream) throw new FS.ErrnoError(ERRNO_CODES.EBADF); dir=dirstream.path;
                            }path=PATH.join2(dir, path);
                        } return path;
                    }), doStat: (function(func, path, buf) {
                        try {
                            var stat=func(path);
                        } catch (e) {
                            if (e&&e.node&&PATH.normalize(path)!==PATH.normalize(FS.getPath(e.node))) {
                                return -ERRNO_CODES.ENOTDIR;
                            } throw e;
                        }HEAP32[buf>>2]=stat.dev; HEAP32[buf+4>>2]=0; HEAP32[buf+8>>2]=stat.ino; HEAP32[buf+12>>2]=stat.mode; HEAP32[buf+16>>2]=stat.nlink; HEAP32[buf+20>>2]=stat.uid; HEAP32[buf+24>>2]=stat.gid; HEAP32[buf+28>>2]=stat.rdev; HEAP32[buf+32>>2]=0; HEAP32[buf+36>>2]=stat.size; HEAP32[buf+40>>2]=4096; HEAP32[buf+44>>2]=stat.blocks; HEAP32[buf+48>>2]=stat.atime.getTime()/1e3|0; HEAP32[buf+52>>2]=0; HEAP32[buf+56>>2]=stat.mtime.getTime()/1e3|0; HEAP32[buf+60>>2]=0; HEAP32[buf+64>>2]=stat.ctime.getTime()/1e3|0; HEAP32[buf+68>>2]=0; HEAP32[buf+72>>2]=stat.ino; return 0;
                    }), doMsync: (function(addr, stream, len, flags) {
                        const buffer=new Uint8Array(HEAPU8.subarray(addr, addr+len)); FS.msync(stream, buffer, 0, len, flags);
                    }), doMkdir: (function(path, mode) {
                        path=PATH.normalize(path); if (path[path.length-1]==='/')path=path.substr(0, path.length-1); FS.mkdir(path, mode, 0); return 0;
                    }), doMknod: (function(path, mode, dev) {
                        switch (mode&61440) {
                        case 32768: case 8192: case 24576: case 4096: case 49152: break; default: return -ERRNO_CODES.EINVAL;
                        }FS.mknod(path, mode, dev); return 0;
                    }), doReadlink: (function(path, buf, bufsize) {
                        if (bufsize<=0) return -ERRNO_CODES.EINVAL; const ret=FS.readlink(path); const len=Math.min(bufsize, lengthBytesUTF8(ret)); const endChar=HEAP8[buf+len]; stringToUTF8(ret, buf, bufsize+1); HEAP8[buf+len]=endChar; return len;
                    }), doAccess: (function(path, amode) {
                        if (amode&~7) {
                            return -ERRNO_CODES.EINVAL;
                        } let node; const lookup=FS.lookupPath(path, {follow: true}); node=lookup.node; let perms=''; if (amode&4)perms+='r'; if (amode&2)perms+='w'; if (amode&1)perms+='x'; if (perms&&FS.nodePermissions(node, perms)) {
                            return -ERRNO_CODES.EACCES;
                        } return 0;
                    }), doDup: (function(path, flags, suggestFD) {
                        const suggest=FS.getStream(suggestFD); if (suggest)FS.close(suggest); return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
                    }), doReadv: (function(stream, iov, iovcnt, offset) {
                        let ret=0; for (let i=0; i<iovcnt; i++) {
                            const ptr=HEAP32[iov+i*8>>2]; const len=HEAP32[iov+(i*8+4)>>2]; const curr=FS.read(stream, HEAP8, ptr, len, offset); if (curr<0) return -1; ret+=curr; if (curr<len) break;
                        } return ret;
                    }), doWritev: (function(stream, iov, iovcnt, offset) {
                        let ret=0; for (let i=0; i<iovcnt; i++) {
                            const ptr=HEAP32[iov+i*8>>2]; const len=HEAP32[iov+(i*8+4)>>2]; const curr=FS.write(stream, HEAP8, ptr, len, offset); if (curr<0) return -1; ret+=curr;
                        } return ret;
                    }), varargs: 0, get: (function(varargs) {
                        SYSCALLS.varargs+=4; const ret=HEAP32[SYSCALLS.varargs-4>>2]; return ret;
                    }), getStr: (function() {
                        const ret=Pointer_stringify(SYSCALLS.get()); return ret;
                    }), getStreamFromFD: (function() {
                        const stream=FS.getStream(SYSCALLS.get()); if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF); return stream;
                    }), getSocketFromFD: (function() {
                        const socket=SOCKFS.getSocket(SYSCALLS.get()); if (!socket) throw new FS.ErrnoError(ERRNO_CODES.EBADF); return socket;
                    }), getSocketAddress: (function(allowNull) {
                        const addrp=SYSCALLS.get(); const addrlen=SYSCALLS.get(); if (allowNull&&addrp===0) return null; const info=__read_sockaddr(addrp, addrlen); if (info.errno) throw new FS.ErrnoError(info.errno); info.addr=DNS.lookup_addr(info.addr)||info.addr; return info;
                    }), get64: (function() {
                        const low=SYSCALLS.get(); const high=SYSCALLS.get(); if (low>=0)assert(high===0); else assert(high===-1); return low;
                    }), getZero: (function() {
                        assert(SYSCALLS.get()===0);
                    })}; function ___syscall140(which, varargs) {
                        SYSCALLS.varargs=varargs; try {
                            const stream=SYSCALLS.getStreamFromFD(); const offset_high=SYSCALLS.get(); const offset_low=SYSCALLS.get(); const result=SYSCALLS.get(); const whence=SYSCALLS.get(); const offset=offset_low; FS.llseek(stream, offset, whence); HEAP32[result>>2]=stream.position; if (stream.getdents&&offset===0&&whence===0)stream.getdents=null; return 0;
                        } catch (e) {
                            if (typeof FS==='undefined'||!(e instanceof FS.ErrnoError))abort(e); return -e.errno;
                        }
                    } function ___syscall145(which, varargs) {
                        SYSCALLS.varargs=varargs; try {
                            const stream=SYSCALLS.getStreamFromFD(); const iov=SYSCALLS.get(); const iovcnt=SYSCALLS.get(); return SYSCALLS.doReadv(stream, iov, iovcnt);
                        } catch (e) {
                            if (typeof FS==='undefined'||!(e instanceof FS.ErrnoError))abort(e); return -e.errno;
                        }
                    } function ___syscall146(which, varargs) {
                        SYSCALLS.varargs=varargs; try {
                            const stream=SYSCALLS.getStreamFromFD(); const iov=SYSCALLS.get(); const iovcnt=SYSCALLS.get(); return SYSCALLS.doWritev(stream, iov, iovcnt);
                        } catch (e) {
                            if (typeof FS==='undefined'||!(e instanceof FS.ErrnoError))abort(e); return -e.errno;
                        }
                    } function ___syscall221(which, varargs) {
                        SYSCALLS.varargs=varargs; try {
                            const stream=SYSCALLS.getStreamFromFD(); const cmd=SYSCALLS.get(); switch (cmd) {
                            case 0: {var arg=SYSCALLS.get(); if (arg<0) {
                                return -ERRNO_CODES.EINVAL;
                            } let newStream; newStream=FS.open(stream.path, stream.flags, 0, arg); return newStream.fd;};case 1: case 2: return 0; case 3: return stream.flags; case 4: {var arg=SYSCALLS.get(); stream.flags|=arg; return 0;};case 12: case 12: {var arg=SYSCALLS.get(); const offset=0; HEAP16[arg+offset>>1]=2; return 0;};case 13: case 14: case 13: case 14: return 0; case 16: case 8: return -ERRNO_CODES.EINVAL; case 9: ___setErrNo(ERRNO_CODES.EINVAL); return -1; default: {return -ERRNO_CODES.EINVAL;}
                            }
                        } catch (e) {
                            if (typeof FS==='undefined'||!(e instanceof FS.ErrnoError))abort(e); return -e.errno;
                        }
                    } function ___syscall5(which, varargs) {
                        SYSCALLS.varargs=varargs; try {
                            const pathname=SYSCALLS.getStr(); const flags=SYSCALLS.get(); const mode=SYSCALLS.get(); const stream=FS.open(pathname, flags, mode); return stream.fd;
                        } catch (e) {
                            if (typeof FS==='undefined'||!(e instanceof FS.ErrnoError))abort(e); return -e.errno;
                        }
                    } function ___syscall54(which, varargs) {
                        SYSCALLS.varargs=varargs; try {
                            const stream=SYSCALLS.getStreamFromFD(); const op=SYSCALLS.get(); switch (op) {
                            case 21509: case 21505: {if (!stream.tty) return -ERRNO_CODES.ENOTTY; return 0;};case 21510: case 21511: case 21512: case 21506: case 21507: case 21508: {if (!stream.tty) return -ERRNO_CODES.ENOTTY; return 0;};case 21519: {if (!stream.tty) return -ERRNO_CODES.ENOTTY; var argp=SYSCALLS.get(); HEAP32[argp>>2]=0; return 0;};case 21520: {if (!stream.tty) return -ERRNO_CODES.ENOTTY; return -ERRNO_CODES.EINVAL;};case 21531: {var argp=SYSCALLS.get(); return FS.ioctl(stream, op, argp);};case 21523: {if (!stream.tty) return -ERRNO_CODES.ENOTTY; return 0;};default: abort('bad ioctl syscall '+op);
                            }
                        } catch (e) {
                            if (typeof FS==='undefined'||!(e instanceof FS.ErrnoError))abort(e); return -e.errno;
                        }
                    } function ___syscall6(which, varargs) {
                        SYSCALLS.varargs=varargs; try {
                            const stream=SYSCALLS.getStreamFromFD(); FS.close(stream); return 0;
                        } catch (e) {
                            if (typeof FS==='undefined'||!(e instanceof FS.ErrnoError))abort(e); return -e.errno;
                        }
                    } function ___syscall91(which, varargs) {
                        SYSCALLS.varargs=varargs; try {
                            const addr=SYSCALLS.get(); const len=SYSCALLS.get(); const info=SYSCALLS.mappings[addr]; if (!info) return 0; if (len===info.len) {
                                const stream=FS.getStream(info.fd); SYSCALLS.doMsync(addr, stream, len, info.flags); FS.munmap(stream); SYSCALLS.mappings[addr]=null; if (info.allocated) {
                                    _free(info.malloc);
                                }
                            } return 0;
                        } catch (e) {
                            if (typeof FS==='undefined'||!(e instanceof FS.ErrnoError))abort(e); return -e.errno;
                        }
                    } function ___unlock() {} function _abort() {
                        Module['abort']();
                    } function __exit(status) {
                        Module['exit'](status);
                    } function _exit(status) {
                        __exit(status);
                    } const _environ=STATICTOP; STATICTOP+=16; function ___buildEnvironment(env) {
                        const MAX_ENV_VALUES=64; const TOTAL_ENV_SIZE=1024; let poolPtr; let envPtr; if (!___buildEnvironment.called) {
                            ___buildEnvironment.called=true; ENV['USER']=ENV['LOGNAME']='web_user'; ENV['PATH']='/'; ENV['PWD']='/'; ENV['HOME']='/home/web_user'; ENV['LANG']='C.UTF-8'; ENV['_']=Module['thisProgram']; poolPtr=staticAlloc(TOTAL_ENV_SIZE); envPtr=staticAlloc(MAX_ENV_VALUES*4); HEAP32[envPtr>>2]=poolPtr; HEAP32[_environ>>2]=envPtr;
                        } else {
                            envPtr=HEAP32[_environ>>2]; poolPtr=HEAP32[envPtr>>2];
                        } const strings=[]; let totalSize=0; for (const key in env) {
                            if (typeof env[key]==='string') {
                                var line=key+'='+env[key]; strings.push(line); totalSize+=line.length;
                            }
                        } if (totalSize>TOTAL_ENV_SIZE) {
                            throw new Error('Environment size exceeded TOTAL_ENV_SIZE!');
                        } const ptrSize=4; for (let i=0; i<strings.length; i++) {
                            var line=strings[i]; writeAsciiToMemory(line, poolPtr); HEAP32[envPtr+i*ptrSize>>2]=poolPtr; poolPtr+=line.length+1;
                        }HEAP32[envPtr+strings.length*ptrSize>>2]=0;
                    } var ENV={}; function _getenv(name) {
                        if (name===0) return 0; name=Pointer_stringify(name); if (!ENV.hasOwnProperty(name)) return 0; if (_getenv.ret)_free(_getenv.ret); _getenv.ret=allocateUTF8(ENV[name]); return _getenv.ret;
                    } function _llvm_trap() {
                        abort('trap!');
                    } function _emscripten_memcpy_big(dest, src, num) {
                        HEAPU8.set(HEAPU8.subarray(src, src+num), dest); return dest;
                    } const PTHREAD_SPECIFIC={}; function _pthread_getspecific(key) {
                        return PTHREAD_SPECIFIC[key]||0;
                    } let PTHREAD_SPECIFIC_NEXT_KEY=1; function _pthread_key_create(key, destructor) {
                        if (key==0) {
                            return ERRNO_CODES.EINVAL;
                        }HEAP32[key>>2]=PTHREAD_SPECIFIC_NEXT_KEY; PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY]=0; PTHREAD_SPECIFIC_NEXT_KEY++; return 0;
                    } function _pthread_once(ptr, func) {
                        if (!_pthread_once.seen)_pthread_once.seen={}; if (ptr in _pthread_once.seen) return; Module['dynCall_v'](func); _pthread_once.seen[ptr]=1;
                    } function _pthread_setspecific(key, value) {
                        if (!(key in PTHREAD_SPECIFIC)) {
                            return ERRNO_CODES.EINVAL;
                        }PTHREAD_SPECIFIC[key]=value; return 0;
                    }FS.staticInit(); __ATINIT__.unshift((function() {
                        if (!Module['noFSInit']&&!FS.init.initialized)FS.init();
                    })); __ATMAIN__.push((function() {
                        FS.ignorePermissions=false;
                    })); __ATEXIT__.push((function() {
                        FS.quit();
                    })); __ATINIT__.unshift((function() {
                        TTY.init();
                    })); __ATEXIT__.push((function() {
                        TTY.shutdown();
                    })); if (ENVIRONMENT_IS_NODE) {
                        var fs=__webpack_require__(0); var NODEJS_PATH=__webpack_require__(0); NODEFS.staticInit();
                    }___buildEnvironment(ENV); DYNAMICTOP_PTR=staticAlloc(4); STACK_BASE=STACKTOP=alignMemory(STATICTOP); STACK_MAX=STACK_BASE+TOTAL_STACK; DYNAMIC_BASE=alignMemory(STACK_MAX); HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE; staticSealed=true; function intArrayFromString(stringy, dontAddNull, length) {
                        const len=length>0?length:lengthBytesUTF8(stringy)+1; const u8array=new Array(len); const numBytesWritten=stringToUTF8Array(stringy, u8array, 0, u8array.length); if (dontAddNull)u8array.length=numBytesWritten; return u8array;
                    }Module['wasmTableSize']=104; Module['wasmMaxTableSize']=104; function invoke_diii(index, a1, a2, a3) {
                        try {
                            return Module['dynCall_diii'](index, a1, a2, a3);
                        } catch (e) {
                            if (typeof e!=='number'&&e!=='longjmp') throw e; Module['setThrew'](1, 0);
                        }
                    } function invoke_i(index) {
                        try {
                            return Module['dynCall_i'](index);
                        } catch (e) {
                            if (typeof e!=='number'&&e!=='longjmp') throw e; Module['setThrew'](1, 0);
                        }
                    } function invoke_ii(index, a1) {
                        try {
                            return Module['dynCall_ii'](index, a1);
                        } catch (e) {
                            if (typeof e!=='number'&&e!=='longjmp') throw e; Module['setThrew'](1, 0);
                        }
                    } function invoke_v(index) {
                        try {
                            Module['dynCall_v'](index);
                        } catch (e) {
                            if (typeof e!=='number'&&e!=='longjmp') throw e; Module['setThrew'](1, 0);
                        }
                    } function invoke_vi(index, a1) {
                        try {
                            Module['dynCall_vi'](index, a1);
                        } catch (e) {
                            if (typeof e!=='number'&&e!=='longjmp') throw e; Module['setThrew'](1, 0);
                        }
                    } function invoke_vii(index, a1, a2) {
                        try {
                            Module['dynCall_vii'](index, a1, a2);
                        } catch (e) {
                            if (typeof e!=='number'&&e!=='longjmp') throw e; Module['setThrew'](1, 0);
                        }
                    } function invoke_viii(index, a1, a2, a3) {
                        try {
                            Module['dynCall_viii'](index, a1, a2, a3);
                        } catch (e) {
                            if (typeof e!=='number'&&e!=='longjmp') throw e; Module['setThrew'](1, 0);
                        }
                    } function invoke_viiii(index, a1, a2, a3, a4) {
                        try {
                            Module['dynCall_viiii'](index, a1, a2, a3, a4);
                        } catch (e) {
                            if (typeof e!=='number'&&e!=='longjmp') throw e; Module['setThrew'](1, 0);
                        }
                    } function invoke_viiiiiidddii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
                        try {
                            Module['dynCall_viiiiiidddii'](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
                        } catch (e) {
                            if (typeof e!=='number'&&e!=='longjmp') throw e; Module['setThrew'](1, 0);
                        }
                    }Module.asmGlobalArg={}; Module.asmLibraryArg={'abort': abort, 'enlargeMemory': enlargeMemory, 'getTotalMemory': getTotalMemory, 'abortOnCannotGrowMemory': abortOnCannotGrowMemory, 'invoke_diii': invoke_diii, 'invoke_i': invoke_i, 'invoke_ii': invoke_ii, 'invoke_v': invoke_v, 'invoke_vi': invoke_vi, 'invoke_vii': invoke_vii, 'invoke_viii': invoke_viii, 'invoke_viiii': invoke_viiii, 'invoke_viiiiiidddii': invoke_viiiiiidddii, '___cxa_allocate_exception': ___cxa_allocate_exception, '___cxa_begin_catch': ___cxa_begin_catch, '___cxa_end_catch': ___cxa_end_catch, '___cxa_find_matching_catch_2': ___cxa_find_matching_catch_2, '___cxa_find_matching_catch_3': ___cxa_find_matching_catch_3, '___cxa_pure_virtual': ___cxa_pure_virtual, '___cxa_throw': ___cxa_throw, '___lock': ___lock, '___map_file': ___map_file, '___resumeException': ___resumeException, '___setErrNo': ___setErrNo, '___syscall140': ___syscall140, '___syscall145': ___syscall145, '___syscall146': ___syscall146, '___syscall221': ___syscall221, '___syscall5': ___syscall5, '___syscall54': ___syscall54, '___syscall6': ___syscall6, '___syscall91': ___syscall91, '___unlock': ___unlock, '_abort': _abort, '_emscripten_memcpy_big': _emscripten_memcpy_big, '_exit': _exit, '_getenv': _getenv, '_llvm_trap': _llvm_trap, '_pthread_getspecific': _pthread_getspecific, '_pthread_key_create': _pthread_key_create, '_pthread_once': _pthread_once, '_pthread_setspecific': _pthread_setspecific, 'DYNAMICTOP_PTR': DYNAMICTOP_PTR, 'STACKTOP': STACKTOP}; const asm=Module['asm'](Module.asmGlobalArg, Module.asmLibraryArg, buffer); Module['asm']=asm; const ___cxa_can_catch=Module['___cxa_can_catch']=(function() {
                        return Module['asm']['___cxa_can_catch'].apply(null, arguments);
                    }); const ___cxa_is_pointer_type=Module['___cxa_is_pointer_type']=(function() {
                        return Module['asm']['___cxa_is_pointer_type'].apply(null, arguments);
                    }); const ___errno_location=Module['___errno_location']=(function() {
                        return Module['asm']['___errno_location'].apply(null, arguments);
                    }); const _add_instance=Module['_add_instance']=(function() {
                        return Module['asm']['_add_instance'].apply(null, arguments);
                    }); const _create_svm_nodes=Module['_create_svm_nodes']=(function() {
                        return Module['asm']['_create_svm_nodes'].apply(null, arguments);
                    }); const _deserialize_model=Module['_deserialize_model']=(function() {
                        return Module['asm']['_deserialize_model'].apply(null, arguments);
                    }); var _emscripten_replace_memory=Module['_emscripten_replace_memory']=(function() {
                        return Module['asm']['_emscripten_replace_memory'].apply(null, arguments);
                    }); var _free=Module['_free']=(function() {
                        return Module['asm']['_free'].apply(null, arguments);
                    }); const _free_problem=Module['_free_problem']=(function() {
                        return Module['asm']['_free_problem'].apply(null, arguments);
                    }); const _get_svr_epsilon=Module['_get_svr_epsilon']=(function() {
                        return Module['asm']['_get_svr_epsilon'].apply(null, arguments);
                    }); const _libsvm_cross_validation=Module['_libsvm_cross_validation']=(function() {
                        return Module['asm']['_libsvm_cross_validation'].apply(null, arguments);
                    }); const _libsvm_predict_one=Module['_libsvm_predict_one']=(function() {
                        return Module['asm']['_libsvm_predict_one'].apply(null, arguments);
                    }); const _libsvm_predict_one_probability=Module['_libsvm_predict_one_probability']=(function() {
                        return Module['asm']['_libsvm_predict_one_probability'].apply(null, arguments);
                    }); const _libsvm_train=Module['_libsvm_train']=(function() {
                        return Module['asm']['_libsvm_train'].apply(null, arguments);
                    }); const _libsvm_train_problem=Module['_libsvm_train_problem']=(function() {
                        return Module['asm']['_libsvm_train_problem'].apply(null, arguments);
                    }); var _malloc=Module['_malloc']=(function() {
                        return Module['asm']['_malloc'].apply(null, arguments);
                    }); const _parse_command_line=Module['_parse_command_line']=(function() {
                        return Module['asm']['_parse_command_line'].apply(null, arguments);
                    }); const _serialize_model=Module['_serialize_model']=(function() {
                        return Module['asm']['_serialize_model'].apply(null, arguments);
                    }); const _svm_free_model=Module['_svm_free_model']=(function() {
                        return Module['asm']['_svm_free_model'].apply(null, arguments);
                    }); const _svm_get_labels=Module['_svm_get_labels']=(function() {
                        return Module['asm']['_svm_get_labels'].apply(null, arguments);
                    }); const _svm_get_nr_class=Module['_svm_get_nr_class']=(function() {
                        return Module['asm']['_svm_get_nr_class'].apply(null, arguments);
                    }); const _svm_get_nr_sv=Module['_svm_get_nr_sv']=(function() {
                        return Module['asm']['_svm_get_nr_sv'].apply(null, arguments);
                    }); const _svm_get_sv_indices=Module['_svm_get_sv_indices']=(function() {
                        return Module['asm']['_svm_get_sv_indices'].apply(null, arguments);
                    }); const _svm_get_svm_type=Module['_svm_get_svm_type']=(function() {
                        return Module['asm']['_svm_get_svm_type'].apply(null, arguments);
                    }); const _svm_get_svr_probability=Module['_svm_get_svr_probability']=(function() {
                        return Module['asm']['_svm_get_svr_probability'].apply(null, arguments);
                    }); var setTempRet0=Module['setTempRet0']=(function() {
                        return Module['asm']['setTempRet0'].apply(null, arguments);
                    }); const setThrew=Module['setThrew']=(function() {
                        return Module['asm']['setThrew'].apply(null, arguments);
                    }); var stackAlloc=Module['stackAlloc']=(function() {
                        return Module['asm']['stackAlloc'].apply(null, arguments);
                    }); var stackRestore=Module['stackRestore']=(function() {
                        return Module['asm']['stackRestore'].apply(null, arguments);
                    }); var stackSave=Module['stackSave']=(function() {
                        return Module['asm']['stackSave'].apply(null, arguments);
                    }); const dynCall_diii=Module['dynCall_diii']=(function() {
                        return Module['asm']['dynCall_diii'].apply(null, arguments);
                    }); const dynCall_i=Module['dynCall_i']=(function() {
                        return Module['asm']['dynCall_i'].apply(null, arguments);
                    }); const dynCall_ii=Module['dynCall_ii']=(function() {
                        return Module['asm']['dynCall_ii'].apply(null, arguments);
                    }); const dynCall_v=Module['dynCall_v']=(function() {
                        return Module['asm']['dynCall_v'].apply(null, arguments);
                    }); const dynCall_vi=Module['dynCall_vi']=(function() {
                        return Module['asm']['dynCall_vi'].apply(null, arguments);
                    }); const dynCall_vii=Module['dynCall_vii']=(function() {
                        return Module['asm']['dynCall_vii'].apply(null, arguments);
                    }); const dynCall_viii=Module['dynCall_viii']=(function() {
                        return Module['asm']['dynCall_viii'].apply(null, arguments);
                    }); const dynCall_viiii=Module['dynCall_viiii']=(function() {
                        return Module['asm']['dynCall_viiii'].apply(null, arguments);
                    }); const dynCall_viiiiiidddii=Module['dynCall_viiiiiidddii']=(function() {
                        return Module['asm']['dynCall_viiiiiidddii'].apply(null, arguments);
                    }); Module['asm']=asm; Module['cwrap']=cwrap; Module['Pointer_stringify']=Pointer_stringify; Module['then']=(function(func) {
                        if (Module['calledRun']) {
                            func(Module);
                        } else {
                            const old=Module['onRuntimeInitialized']; Module['onRuntimeInitialized']=(function() {
                                if (old)old(); func(Module);
                            });
                        } return Module;
                    }); function ExitStatus(status) {
                        this.name='ExitStatus'; this.message='Program terminated with exit('+status+')'; this.status=status;
                    }ExitStatus.prototype=new Error; ExitStatus.prototype.constructor=ExitStatus; let initialStackTop; dependenciesFulfilled=function runCaller() {
                        if (!Module['calledRun'])run(); if (!Module['calledRun'])dependenciesFulfilled=runCaller;
                    }; function run(args) {
                        args=args||Module['arguments']; if (runDependencies>0) {
                            return;
                        }preRun(); if (runDependencies>0) return; if (Module['calledRun']) return; function doRun() {
                            if (Module['calledRun']) return; Module['calledRun']=true; if (ABORT) return; ensureInitRuntime(); preMain(); if (Module['onRuntimeInitialized'])Module['onRuntimeInitialized'](); postRun();
                        } if (Module['setStatus']) {
                            Module['setStatus']('Running...'); setTimeout((function() {
                                setTimeout((function() {
                                    Module['setStatus']('');
                                }), 1); doRun();
                            }), 1);
                        } else {
                            doRun();
                        }
                    }Module['run']=run; function exit(status, implicit) {
                        if (implicit&&Module['noExitRuntime']&&status===0) {
                            return;
                        } if (Module['noExitRuntime']) {} else {
                            ABORT=true; EXITSTATUS=status; STACKTOP=initialStackTop; exitRuntime(); if (Module['onExit'])Module['onExit'](status);
                        } if (ENVIRONMENT_IS_NODE) {
                            process['exit'](status);
                        }Module['quit'](status, new ExitStatus(status));
                    }Module['exit']=exit; function abort(what) {
                        if (Module['onAbort']) {
                            Module['onAbort'](what);
                        } if (what!==undefined) {
                            Module.print(what); Module.printErr(what); what=JSON.stringify(what);
                        } else {
                            what='';
                        }ABORT=true; EXITSTATUS=1; throw 'abort('+what+'). Build with -s ASSERTIONS=1 for more info.';
                    }Module['abort']=abort; if (Module['preInit']) {
                        if (typeof Module['preInit']=='function')Module['preInit']=[Module['preInit']]; while (Module['preInit'].length>0) {
                            Module['preInit'].pop()();
                        }
                    }Module['noExitRuntime']=true; run();


                    return SVM;
                };
                if (true) {
                    module.exports = SVM;
                } else if (typeof define === 'function' && define['amd']) {
                    define([], function() {
                        return SVM;
                    });
                } else if (typeof exports === 'object') {
                    exports['SVM'] = SVM;
                }
                module.exports = SVM(Module);
                /* WEBPACK VAR INJECTION */}.call(exports, '/', __webpack_require__(6)));
            /** */}),
        /* 6 */
        /** */ (function(module, exports, __webpack_require__) {
            exports.nextTick = function nextTick(fn) {
                setTimeout(fn, 0);
            };

            exports.platform = exports.arch =
exports.execPath = exports.title = 'browser';
            exports.pid = 1;
            exports.browser = true;
            exports.env = {};
            exports.argv = [];

            exports.binding = function(name) {
                throw new Error('No such module. (Possibly not yet loaded)');
            };

            (function() {
                let cwd = '/';
                let path;
                exports.cwd = function() {
                    return cwd;
                };
                exports.chdir = function(dir) {
                    if (!path) path = __webpack_require__(0);
                    cwd = path.resolve(dir, cwd);
                };
            })();

            exports.exit = exports.kill =
exports.umask = exports.dlopen =
exports.uptime = exports.memoryUsage =
exports.uvCounters = function() {};
            exports.features = {};
            /** */}),
        /** ****/ ]);
});
