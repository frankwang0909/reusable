function cleanWhitespace(element)   
{   
    for(var i=0; i<element.childNodes.length; i++)   
    {   
        var node = element.childNodes[i];   

        // nodeType == 3 为文本节点
        // 文本节点的nodeValue为文本的内容
        // /\S/表示非空白字符的正则表达式
        // .test()是正则表达式的常用方法，根据括号内的字符串是否匹配到正则表达式而返回true或false
        if(node.nodeType == 3 && !/\S/.test(node.nodeValue))   
        {   
            node.parentNode.removeChild(node);   
        }   
    }   
}   