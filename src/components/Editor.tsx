'use client';
import React, { useState, ChangeEvent, TextareaHTMLAttributes, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from './ui/button'
import { Md2PosterContent, Md2Poster, Md2PosterHeader, Md2PosterFooter } from 'markdown-to-image'
import { Copy, LoaderCircle } from 'lucide-react';


const Textarea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ onChange, ...rest }) => {
  return (
    <textarea
      className="border-none bg-gray-100 p-8 w-full resize-none h-full min-h-screen
      focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0
      text-gray-900/70 hover:text-gray-900 focus:text-gray-900 font-light font-inter
      "
      {...rest}
      onChange={(e) => onChange?.(e)}
    />
  )
}

const defaultMd = `# AI Morning News - April 29th
![image](https://imageio.forbes.com/specials-images/imageserve/64b5825a5b9b4d3225e9bd15/artificial-intelligence--ai/960x0.jpg?format=jpg&width=1440)
1. **MetaElephant Company Releases Multi-Modal Large Model XVERSE-V**: Supports image input of any aspect ratio, performs well in multiple authoritative evaluations, and has been open-sourced.
2. **Tongyi Qianwen Team Open-Sources Billion-Parameter Model Qwen1.5-110B**: Uses Transformer decoder architecture, supports multiple languages, and has an efficient attention mechanism.
  `

export default function Editor() {
  const [mdString, setMdString] = useState(defaultMd)
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMdString(e.target.value)
  }
  const markdownRef = useRef<any>(null)
  const [copyLoading, setCopyLoading] = useState(false)
  const handleCopyFromChild = () => {
    setCopyLoading(true)
    markdownRef?.current?.handleCopy().then(res => {
      setCopyLoading(false)
      alert('Copy Success!')
    }).catch(err => {
      setCopyLoading(false)
      console.log('err copying from child', err)
    })
  }
  const copySuccessCallback = () => {
    console.log('copySuccessCallback')
  }
  return (
    <ScrollArea className="h-[96vh] w-full border-2 border-gray-900 rounded-xl my-4 relative">
      <div className="flex flex-row h-full ">
        <div className="w-1/2">
          {/* Edit */}
          <Textarea placeholder="markdown" onChange={handleChange} defaultValue={mdString} />
        </div>
        <div className="w-1/2 mx-auto flex justify-center p-4 ">
          {/* Preview */}
          <div className="flex flex-col w-fit">
            <Md2Poster theme="SpringGradientWave" copySuccessCallback={copySuccessCallback} ref={markdownRef}>
              <Md2PosterHeader className="flex justify-center items-center px-4 font-medium text-lg">
                <span>{new Date().toISOString().slice(0, 10)}</span>
              </Md2PosterHeader>
              <Md2PosterContent>{mdString}</Md2PosterContent>
              <Md2PosterFooter className='text-center'>
                <img src="/logo.png" alt="logo" className='inline-block mr-2 w-5' />
                Powered by www.lylares.com
              </Md2PosterFooter>
            </Md2Poster>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 flex flex-row gap-2 opacity-80 hover:opacity-100 transition-all">
        <Button className=" rounded-xl" onClick={handleCopyFromChild} {...copyLoading ? { disabled: true } : {}}>
          {copyLoading ?
            <LoaderCircle className="w-4 h-4 mr-1 animate-spin" />
            : <Copy className="w-4 h-4 mr-1" />}
          Copy Image
        </Button>
      </div>
    </ScrollArea>
  )
}
