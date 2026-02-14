test={
    'what is CD' : ['Computer Disk' ,'Compact Disk','Code disk','compact Disk' ],
    'what is TS' :['Telangana State','tesla site','technical support','Telangana State' ],
    'What is python in IT ?':['Snake','Book','Language','lanhuage'],
    'what is Ram ?':['Phone','Memory','pen','memory'],
    'what is Mouse ?': ['ComputerDevice' ,'Pet','Computer','ComputerDevice' ],
    'HDD Stands for?':['HD Disk','Human Disk','Hard Disk','Hard Disk']
}
let output='';
for(let i=0; i< test.length;i++){
    output += '<h2> ${q} </h2>';
}
document.getElementById('opt').innerHTML=output;