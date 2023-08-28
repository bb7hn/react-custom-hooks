# React Custom Hooks

This package contains predefined ready to use custom `React hooks`

[![npm version](https://badge.fury.io/js/r-custom-hooks.svg)](https://www.npmjs.com/package/r-custom-hooks) ![license](https://img.shields.io/github/license/bb7hn/react-custom-hooks.svg) [![coverage](https://codecov.io/github/bb7hn/react-custom-hooks/graph/badge.svg?token=MQMFW6N80S)](https://codecov.io/github/bb7hn/react-custom-hooks)

![publish workflow](https://github.com/bb7hn/react-custom-hooks/actions/workflows/npm-publish.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/bb7hn/react-custom-hooks/badge.svg)](https://snyk.io/test/github/bb7hn/react-custom-hooks)

![Eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)![VsCode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

## Quick Start

install package ```npm i r-custom-hooks```

```ts
/*test*/
import { useDebounce } from 'r-custom-hooks'

export default function MyComponent({...props}){
    const [state,setState] = useState('value');
    const debouncedState = useDebounce(state,500);

    const handleChange = useCallback((e)=>{
        setState(e.target.value)
    },[])

    return (
        <>
            <input 
                type="text" 
                value={state}
                onChange={handleChange}
            />
            {debouncedState}
        </input>
    );
}
```
