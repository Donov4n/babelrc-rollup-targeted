import babelrc from 'babelrc-rollup';

export default function (options = {}) {
    if (typeof options === 'string' || Array.isArray(options)) {
        options = { target: options };
    }
    const _options = Object.assign({}, options);
    
    let targets = _options.targets;
    if (typeof targets === 'string') {
        targets = [targets];
    }
    delete _options.target;
    
    const _babelrc = babelrc(_options);
    if (!target.length) {
        return _babelrc;
    }
    
    _babelrc.presets = _babelrc.presets.map((preset) => {
        if (!Array.isArray(preset)) {
            preset = [preset];
        }

        const [name, config = {}] = preset;
        if (name !== 'env') {
            return preset;
        }
        
        const _targets = Object.keys(config.targets || {});
        if (!_targets.length) {
            return preset;
        }
        
        _targets.forEach((_target) => {
            if (targets.indexOf(_target) === -1) {
                delete config.targets[_target];
            }
        });

        return [name, config];
    });
    
    return _babelrc;
}