!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).angleNormals=e()}}((function(){return function e(t,n,r){function o(i,u){if(!n[i]){if(!t[i]){var a="function"==typeof require&&require;if(!u&&a)return a(i,!0);if(f)return f(i,!0);var p=new Error("Cannot find module '"+i+"'");throw p.code="MODULE_NOT_FOUND",p}var d=n[i]={exports:{}};t[i][0].call(d.exports,(function(e){return o(t[i][1][e]||e)}),d,d.exports,e,t,n,r)}return n[i].exports}for(var f="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,t,n){"use strict";function r(e,t,n){return Math.sqrt(Math.pow(e,2)+Math.pow(t,2)+Math.pow(n,2))}function o(e,t,n){return Math.atan2(t,e-n)}function f(e,t,n,r,o){e[0]+=t*n,e[1]+=t*r,e[2]+=t*o}t.exports=function(e,t){for(var n=t.length,i=e.length,u=new Array(n),a=0;a<n;++a)u[a]=[0,0,0];for(a=0;a<i;++a){var p=e[a],d=t[p[0]],l=t[p[1]],s=t[p[2]],c=d[0]-l[0],h=d[1]-l[1],w=d[2]-l[2],M=r(c,h,w),y=l[0]-s[0],v=l[1]-s[1],q=l[2]-s[2],x=r(y,v,q),g=s[0]-d[0],m=s[1]-d[1],b=s[2]-d[2],N=r(g,m,b);if(!(Math.min(M,x,N)<1e-6)){var O=.5*(M+x+N),D=Math.sqrt((O-M)*(O-x)*(O-N)/O),E=h*q-w*v,U=w*y-c*q,_=c*v-h*y,j=r(E,U,_);E/=j,U/=j,_/=j,f(u[p[0]],o(O,D,x),E,U,_),f(u[p[1]],o(O,D,N),E,U,_),f(u[p[2]],o(O,D,M),E,U,_)}}for(a=0;a<n;++a){var A=u[a],C=Math.sqrt(Math.pow(A[0],2)+Math.pow(A[1],2)+Math.pow(A[2],2));C<1e-8?(A[0]=1,A[1]=0,A[2]=0):(A[0]/=C,A[1]/=C,A[2]/=C)}return u}},{}]},{},[1])(1)}));