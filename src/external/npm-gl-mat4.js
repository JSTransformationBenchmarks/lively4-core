!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).glMat4=t()}}(function(){return function(){return function t(n,r,o){function e(f,u){if(!r[f]){if(!n[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(i)return i(f,!0);var s=new Error("Cannot find module '"+f+"'");throw s.code="MODULE_NOT_FOUND",s}var c=r[f]={exports:{}};n[f][0].call(c.exports,function(t){return e(n[f][1][t]||t)},c,c.exports,t,n,r,o)}return r[f].exports}for(var i="function"==typeof require&&require,f=0;f<o.length;f++)e(o[f]);return e}}()({1:[function(t,n,r){n.exports=function(t,n){var r=n[0],o=n[1],e=n[2],i=n[3],f=n[4],u=n[5],a=n[6],s=n[7],c=n[8],p=n[9],l=n[10],h=n[11],m=n[12],v=n[13],M=n[14],x=n[15];return t[0]=u*(l*x-h*M)-p*(a*x-s*M)+v*(a*h-s*l),t[1]=-(o*(l*x-h*M)-p*(e*x-i*M)+v*(e*h-i*l)),t[2]=o*(a*x-s*M)-u*(e*x-i*M)+v*(e*s-i*a),t[3]=-(o*(a*h-s*l)-u*(e*h-i*l)+p*(e*s-i*a)),t[4]=-(f*(l*x-h*M)-c*(a*x-s*M)+m*(a*h-s*l)),t[5]=r*(l*x-h*M)-c*(e*x-i*M)+m*(e*h-i*l),t[6]=-(r*(a*x-s*M)-f*(e*x-i*M)+m*(e*s-i*a)),t[7]=r*(a*h-s*l)-f*(e*h-i*l)+c*(e*s-i*a),t[8]=f*(p*x-h*v)-c*(u*x-s*v)+m*(u*h-s*p),t[9]=-(r*(p*x-h*v)-c*(o*x-i*v)+m*(o*h-i*p)),t[10]=r*(u*x-s*v)-f*(o*x-i*v)+m*(o*s-i*u),t[11]=-(r*(u*h-s*p)-f*(o*h-i*p)+c*(o*s-i*u)),t[12]=-(f*(p*M-l*v)-c*(u*M-a*v)+m*(u*l-a*p)),t[13]=r*(p*M-l*v)-c*(o*M-e*v)+m*(o*l-e*p),t[14]=-(r*(u*M-a*v)-f*(o*M-e*v)+m*(o*a-e*u)),t[15]=r*(u*l-a*p)-f*(o*l-e*p)+c*(o*a-e*u),t}},{}],2:[function(t,n,r){n.exports=function(t){var n=new Float32Array(16);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n}},{}],3:[function(t,n,r){n.exports=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t}},{}],4:[function(t,n,r){n.exports=function(){var t=new Float32Array(16);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}},{}],5:[function(t,n,r){n.exports=function(t){var n=t[0],r=t[1],o=t[2],e=t[3],i=t[4],f=t[5],u=t[6],a=t[7],s=t[8],c=t[9],p=t[10],l=t[11],h=t[12],m=t[13],v=t[14],M=t[15];return(n*f-r*i)*(p*M-l*v)-(n*u-o*i)*(c*M-l*m)+(n*a-e*i)*(c*v-p*m)+(r*u-o*f)*(s*M-l*h)-(r*a-e*f)*(s*v-p*h)+(o*a-e*u)*(s*m-c*h)}},{}],6:[function(t,n,r){n.exports=function(t,n){var r=n[0],o=n[1],e=n[2],i=n[3],f=r+r,u=o+o,a=e+e,s=r*f,c=o*f,p=o*u,l=e*f,h=e*u,m=e*a,v=i*f,M=i*u,x=i*a;return t[0]=1-p-m,t[1]=c+x,t[2]=l-M,t[3]=0,t[4]=c-x,t[5]=1-s-m,t[6]=h+v,t[7]=0,t[8]=l+M,t[9]=h-v,t[10]=1-s-p,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}},{}],7:[function(t,n,r){n.exports=function(t,n,r){var o,e,i,f=r[0],u=r[1],a=r[2],s=Math.sqrt(f*f+u*u+a*a);if(Math.abs(s)<1e-6)return null;return f*=s=1/s,u*=s,a*=s,o=Math.sin(n),e=Math.cos(n),i=1-e,t[0]=f*f*i+e,t[1]=u*f*i+a*o,t[2]=a*f*i-u*o,t[3]=0,t[4]=f*u*i-a*o,t[5]=u*u*i+e,t[6]=a*u*i+f*o,t[7]=0,t[8]=f*a*i+u*o,t[9]=u*a*i-f*o,t[10]=a*a*i+e,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}},{}],8:[function(t,n,r){n.exports=function(t,n,r){var o=n[0],e=n[1],i=n[2],f=n[3],u=o+o,a=e+e,s=i+i,c=o*u,p=o*a,l=o*s,h=e*a,m=e*s,v=i*s,M=f*u,x=f*a,d=f*s;return t[0]=1-(h+v),t[1]=p+d,t[2]=l-x,t[3]=0,t[4]=p-d,t[5]=1-(c+v),t[6]=m+M,t[7]=0,t[8]=l+x,t[9]=m-M,t[10]=1-(c+h),t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t}},{}],9:[function(t,n,r){n.exports=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=n[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}},{}],10:[function(t,n,r){n.exports=function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t}},{}],11:[function(t,n,r){n.exports=function(t,n){var r=Math.sin(n),o=Math.cos(n);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=r,t[7]=0,t[8]=0,t[9]=-r,t[10]=o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}},{}],12:[function(t,n,r){n.exports=function(t,n){var r=Math.sin(n),o=Math.cos(n);return t[0]=o,t[1]=0,t[2]=-r,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=r,t[9]=0,t[10]=o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}},{}],13:[function(t,n,r){n.exports=function(t,n){var r=Math.sin(n),o=Math.cos(n);return t[0]=o,t[1]=r,t[2]=0,t[3]=0,t[4]=-r,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}},{}],14:[function(t,n,r){n.exports=function(t,n,r,o,e,i,f){var u=1/(r-n),a=1/(e-o),s=1/(i-f);return t[0]=2*i*u,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*i*a,t[6]=0,t[7]=0,t[8]=(r+n)*u,t[9]=(e+o)*a,t[10]=(f+i)*s,t[11]=-1,t[12]=0,t[13]=0,t[14]=f*i*2*s,t[15]=0,t}},{}],15:[function(t,n,r){n.exports=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}},{}],16:[function(t,n,r){n.exports={create:t("./create"),clone:t("./clone"),copy:t("./copy"),identity:t("./identity"),transpose:t("./transpose"),invert:t("./invert"),adjoint:t("./adjoint"),determinant:t("./determinant"),multiply:t("./multiply"),translate:t("./translate"),scale:t("./scale"),rotate:t("./rotate"),rotateX:t("./rotateX"),rotateY:t("./rotateY"),rotateZ:t("./rotateZ"),fromRotation:t("./fromRotation"),fromRotationTranslation:t("./fromRotationTranslation"),fromScaling:t("./fromScaling"),fromTranslation:t("./fromTranslation"),fromXRotation:t("./fromXRotation"),fromYRotation:t("./fromYRotation"),fromZRotation:t("./fromZRotation"),fromQuat:t("./fromQuat"),frustum:t("./frustum"),perspective:t("./perspective"),perspectiveFromFieldOfView:t("./perspectiveFromFieldOfView"),ortho:t("./ortho"),lookAt:t("./lookAt"),str:t("./str")}},{"./adjoint":1,"./clone":2,"./copy":3,"./create":4,"./determinant":5,"./fromQuat":6,"./fromRotation":7,"./fromRotationTranslation":8,"./fromScaling":9,"./fromTranslation":10,"./fromXRotation":11,"./fromYRotation":12,"./fromZRotation":13,"./frustum":14,"./identity":15,"./invert":17,"./lookAt":18,"./multiply":19,"./ortho":20,"./perspective":21,"./perspectiveFromFieldOfView":22,"./rotate":23,"./rotateX":24,"./rotateY":25,"./rotateZ":26,"./scale":27,"./str":28,"./translate":29,"./transpose":30}],17:[function(t,n,r){n.exports=function(t,n){var r=n[0],o=n[1],e=n[2],i=n[3],f=n[4],u=n[5],a=n[6],s=n[7],c=n[8],p=n[9],l=n[10],h=n[11],m=n[12],v=n[13],M=n[14],x=n[15],d=r*u-o*f,y=r*a-e*f,R=r*s-i*f,g=o*a-e*u,w=o*s-i*u,q=e*s-i*a,F=c*v-p*m,b=c*M-l*m,T=c*x-h*m,D=p*M-l*v,O=p*x-h*v,X=l*x-h*M,Y=d*X-y*O+R*D+g*T-w*b+q*F;if(!Y)return null;return Y=1/Y,t[0]=(u*X-a*O+s*D)*Y,t[1]=(e*O-o*X-i*D)*Y,t[2]=(v*q-M*w+x*g)*Y,t[3]=(l*w-p*q-h*g)*Y,t[4]=(a*T-f*X-s*b)*Y,t[5]=(r*X-e*T+i*b)*Y,t[6]=(M*R-m*q-x*y)*Y,t[7]=(c*q-l*R+h*y)*Y,t[8]=(f*O-u*T+s*F)*Y,t[9]=(o*T-r*O-i*F)*Y,t[10]=(m*w-v*R+x*d)*Y,t[11]=(p*R-c*w-h*d)*Y,t[12]=(u*b-f*D-a*F)*Y,t[13]=(r*D-o*b+e*F)*Y,t[14]=(v*y-m*g-M*d)*Y,t[15]=(c*g-p*y+l*d)*Y,t}},{}],18:[function(t,n,r){var o=t("./identity");n.exports=function(t,n,r,e){var i,f,u,a,s,c,p,l,h,m,v=n[0],M=n[1],x=n[2],d=e[0],y=e[1],R=e[2],g=r[0],w=r[1],q=r[2];if(Math.abs(v-g)<1e-6&&Math.abs(M-w)<1e-6&&Math.abs(x-q)<1e-6)return o(t);p=v-g,l=M-w,h=x-q,m=1/Math.sqrt(p*p+l*l+h*h),i=y*(h*=m)-R*(l*=m),f=R*(p*=m)-d*h,u=d*l-y*p,(m=Math.sqrt(i*i+f*f+u*u))?(i*=m=1/m,f*=m,u*=m):(i=0,f=0,u=0);a=l*u-h*f,s=h*i-p*u,c=p*f-l*i,(m=Math.sqrt(a*a+s*s+c*c))?(a*=m=1/m,s*=m,c*=m):(a=0,s=0,c=0);return t[0]=i,t[1]=a,t[2]=p,t[3]=0,t[4]=f,t[5]=s,t[6]=l,t[7]=0,t[8]=u,t[9]=c,t[10]=h,t[11]=0,t[12]=-(i*v+f*M+u*x),t[13]=-(a*v+s*M+c*x),t[14]=-(p*v+l*M+h*x),t[15]=1,t}},{"./identity":15}],19:[function(t,n,r){n.exports=function(t,n,r){var o=n[0],e=n[1],i=n[2],f=n[3],u=n[4],a=n[5],s=n[6],c=n[7],p=n[8],l=n[9],h=n[10],m=n[11],v=n[12],M=n[13],x=n[14],d=n[15],y=r[0],R=r[1],g=r[2],w=r[3];return t[0]=y*o+R*u+g*p+w*v,t[1]=y*e+R*a+g*l+w*M,t[2]=y*i+R*s+g*h+w*x,t[3]=y*f+R*c+g*m+w*d,y=r[4],R=r[5],g=r[6],w=r[7],t[4]=y*o+R*u+g*p+w*v,t[5]=y*e+R*a+g*l+w*M,t[6]=y*i+R*s+g*h+w*x,t[7]=y*f+R*c+g*m+w*d,y=r[8],R=r[9],g=r[10],w=r[11],t[8]=y*o+R*u+g*p+w*v,t[9]=y*e+R*a+g*l+w*M,t[10]=y*i+R*s+g*h+w*x,t[11]=y*f+R*c+g*m+w*d,y=r[12],R=r[13],g=r[14],w=r[15],t[12]=y*o+R*u+g*p+w*v,t[13]=y*e+R*a+g*l+w*M,t[14]=y*i+R*s+g*h+w*x,t[15]=y*f+R*c+g*m+w*d,t}},{}],20:[function(t,n,r){n.exports=function(t,n,r,o,e,i,f){var u=1/(n-r),a=1/(o-e),s=1/(i-f);return t[0]=-2*u,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*s,t[11]=0,t[12]=(n+r)*u,t[13]=(e+o)*a,t[14]=(f+i)*s,t[15]=1,t}},{}],21:[function(t,n,r){n.exports=function(t,n,r,o,e){var i=1/Math.tan(n/2),f=1/(o-e);return t[0]=i/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=i,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(e+o)*f,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*e*o*f,t[15]=0,t}},{}],22:[function(t,n,r){n.exports=function(t,n,r,o){var e=Math.tan(n.upDegrees*Math.PI/180),i=Math.tan(n.downDegrees*Math.PI/180),f=Math.tan(n.leftDegrees*Math.PI/180),u=Math.tan(n.rightDegrees*Math.PI/180),a=2/(f+u),s=2/(e+i);return t[0]=a,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=s,t[6]=0,t[7]=0,t[8]=-(f-u)*a*.5,t[9]=(e-i)*s*.5,t[10]=o/(r-o),t[11]=-1,t[12]=0,t[13]=0,t[14]=o*r/(r-o),t[15]=0,t}},{}],23:[function(t,n,r){n.exports=function(t,n,r,o){var e,i,f,u,a,s,c,p,l,h,m,v,M,x,d,y,R,g,w,q,F,b,T,D,O=o[0],X=o[1],Y=o[2],Z=Math.sqrt(O*O+X*X+Y*Y);if(Math.abs(Z)<1e-6)return null;O*=Z=1/Z,X*=Z,Y*=Z,e=Math.sin(r),i=Math.cos(r),f=1-i,u=n[0],a=n[1],s=n[2],c=n[3],p=n[4],l=n[5],h=n[6],m=n[7],v=n[8],M=n[9],x=n[10],d=n[11],y=O*O*f+i,R=X*O*f+Y*e,g=Y*O*f-X*e,w=O*X*f-Y*e,q=X*X*f+i,F=Y*X*f+O*e,b=O*Y*f+X*e,T=X*Y*f-O*e,D=Y*Y*f+i,t[0]=u*y+p*R+v*g,t[1]=a*y+l*R+M*g,t[2]=s*y+h*R+x*g,t[3]=c*y+m*R+d*g,t[4]=u*w+p*q+v*F,t[5]=a*w+l*q+M*F,t[6]=s*w+h*q+x*F,t[7]=c*w+m*q+d*F,t[8]=u*b+p*T+v*D,t[9]=a*b+l*T+M*D,t[10]=s*b+h*T+x*D,t[11]=c*b+m*T+d*D,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]);return t}},{}],24:[function(t,n,r){n.exports=function(t,n,r){var o=Math.sin(r),e=Math.cos(r),i=n[4],f=n[5],u=n[6],a=n[7],s=n[8],c=n[9],p=n[10],l=n[11];n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]);return t[4]=i*e+s*o,t[5]=f*e+c*o,t[6]=u*e+p*o,t[7]=a*e+l*o,t[8]=s*e-i*o,t[9]=c*e-f*o,t[10]=p*e-u*o,t[11]=l*e-a*o,t}},{}],25:[function(t,n,r){n.exports=function(t,n,r){var o=Math.sin(r),e=Math.cos(r),i=n[0],f=n[1],u=n[2],a=n[3],s=n[8],c=n[9],p=n[10],l=n[11];n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]);return t[0]=i*e-s*o,t[1]=f*e-c*o,t[2]=u*e-p*o,t[3]=a*e-l*o,t[8]=i*o+s*e,t[9]=f*o+c*e,t[10]=u*o+p*e,t[11]=a*o+l*e,t}},{}],26:[function(t,n,r){n.exports=function(t,n,r){var o=Math.sin(r),e=Math.cos(r),i=n[0],f=n[1],u=n[2],a=n[3],s=n[4],c=n[5],p=n[6],l=n[7];n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]);return t[0]=i*e+s*o,t[1]=f*e+c*o,t[2]=u*e+p*o,t[3]=a*e+l*o,t[4]=s*e-i*o,t[5]=c*e-f*o,t[6]=p*e-u*o,t[7]=l*e-a*o,t}},{}],27:[function(t,n,r){n.exports=function(t,n,r){var o=r[0],e=r[1],i=r[2];return t[0]=n[0]*o,t[1]=n[1]*o,t[2]=n[2]*o,t[3]=n[3]*o,t[4]=n[4]*e,t[5]=n[5]*e,t[6]=n[6]*e,t[7]=n[7]*e,t[8]=n[8]*i,t[9]=n[9]*i,t[10]=n[10]*i,t[11]=n[11]*i,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t}},{}],28:[function(t,n,r){n.exports=function(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"}},{}],29:[function(t,n,r){n.exports=function(t,n,r){var o,e,i,f,u,a,s,c,p,l,h,m,v=r[0],M=r[1],x=r[2];n===t?(t[12]=n[0]*v+n[4]*M+n[8]*x+n[12],t[13]=n[1]*v+n[5]*M+n[9]*x+n[13],t[14]=n[2]*v+n[6]*M+n[10]*x+n[14],t[15]=n[3]*v+n[7]*M+n[11]*x+n[15]):(o=n[0],e=n[1],i=n[2],f=n[3],u=n[4],a=n[5],s=n[6],c=n[7],p=n[8],l=n[9],h=n[10],m=n[11],t[0]=o,t[1]=e,t[2]=i,t[3]=f,t[4]=u,t[5]=a,t[6]=s,t[7]=c,t[8]=p,t[9]=l,t[10]=h,t[11]=m,t[12]=o*v+u*M+p*x+n[12],t[13]=e*v+a*M+l*x+n[13],t[14]=i*v+s*M+h*x+n[14],t[15]=f*v+c*M+m*x+n[15]);return t}},{}],30:[function(t,n,r){n.exports=function(t,n){if(t===n){var r=n[1],o=n[2],e=n[3],i=n[6],f=n[7],u=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=r,t[6]=n[9],t[7]=n[13],t[8]=o,t[9]=i,t[11]=n[14],t[12]=e,t[13]=f,t[14]=u}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t}},{}]},{},[16])(16)});