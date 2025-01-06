

week = ['월', '화', '수', '목', '금', '토'];
lec_times = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
colors = [
    [255,128,128], 
    [255,223,128],
    [191,255,128],
    [128,255,255],
    [128,159,255],
    [191,128,255],
    [255,128,223],
    [191,191,191]];



window.onload = init;
function init(){
    //alert("ok");
}

function del_time(obj){
    //console.log(obj);
    obj.parentNode.parentNode.remove();

}

function del_lec(obj){
    //console.log(obj);
    obj.parentNode.parentNode.parentNode.remove();

}

function add_time(obj){
    tr1 = document.createElement("tr");
    
    td1 = document.createElement("td");
    td2 = document.createElement("td");
    td3 = document.createElement("td");

    sel1 = document.createElement("select");
    sel2 = document.createElement("select");
    bnt1 = document.createElement("button");
    bnt1.innerHTML = "시간삭제";
    bnt1.setAttribute("onclick", "del_time(this);")

    for(i = 0; i < week.length; i++){
        opt = document.createElement('option');
        opt.innerText = week[i];
        sel1.append(opt);
    }

    for(i = 0; i < lec_times.length; i++){
        opt = document.createElement('option');
        opt.innerText = lec_times[i];
        sel2.append(opt);
    }

    td1.append(sel1);
    td2.append(sel2);
    td3.append(bnt1);

    tr1.append(td1);
    tr1.append(td2);
    tr1.append(td3);

    obj.parentNode.parentNode.parentNode.append(tr1);
}

function add_lec(obj, val){
    num_table = document.querySelectorAll('#fir_lecs table').length;
    if(val == 1 && num_table == 8) return

    //alert(obj.parentNode.parentNode.childNodes[0]);
    //<div>
    //              이 자리가 [0] 번째인가봄   text로 인식
    //				<h3>1순위로 듣    << [1] 번째인가봄
    
    tab = document.createElement('table');
    tab.setAttribute("class", "batch_table");

    tr1 = document.createElement('tr');
    tr2 = document.createElement('tr');
    tr3 = document.createElement('tr');

    td11 = document.createElement('td');
    td11.setAttribute('colspan', '3');
    td21 = document.createElement('td');
    td21.setAttribute('colspan', '2');
    td22 = document.createElement('td');
    td31 = document.createElement('td');
    td32 = document.createElement('td');
    td33 = document.createElement('td');

    inp11 = document.createElement('input');
    inp11.setAttribute('placeholder', '강의명을 입력');
    //inp11.value = '강의명';
    btn21 = document.createElement('button');
    btn21.setAttribute('onclick', 'add_time(this);');
    btn21.innerText = '시간추가';
    btn22 = document.createElement('button');
    btn22.setAttribute('onclick', 'del_lec(this);');
    btn22.innerText = '강의삭제';
    btn22.setAttribute('style','color:red');
    sel31 = document.createElement('select');
    sel32 = document.createElement('select');
    btn33 = document.createElement('button');
    btn33.setAttribute('onclick', 'del_time(this);');
    btn33.innerHTML = '시간삭제';

    for(i = 0; i < week.length; i++){
        opt = document.createElement('option');
        opt.innerText = week[i];
        sel31.append(opt);
    }

    for(i = 0; i < lec_times.length; i++){
        opt = document.createElement('option');
        opt.innerText = lec_times[i];
        sel32.append(opt);
    }

    td11.append(inp11);
    td21.append(btn21);
    td22.append(btn22);
    td31.append(sel31);
    td32.append(sel32);
    td33.append(btn33);

    tr1.append(td11);
    tr2.append(td21);
    tr2.append(td22);
    tr3.append(td31);
    tr3.append(td32);
    tr3.append(td33);

    tab.append(tr1);
    tab.append(tr2);
    tab.append(tr3);
    tab.append(tr3.cloneNode(true));
    tab.append(tr3.cloneNode(true));
    
    if(val == 1){
        //obj.parentNode.parentNode.childNodes[3].append(tab);
        div = document.querySelector('#fir_lecs');
        div.append(tab);

        num_lec_p = document.querySelector('#num_lec_p');
        num_lec_p.innerText = document.querySelectorAll('#fir_lecs table').length;
    }else{
        //obj.parentNode.parentNode.childNodes[9].append(tab);
        div = document.querySelector('#sec_lecs');
        div.append(tab);
    }
}

function add_num(obj){
    obj = obj.parentNode.nextSibling.nextSibling;
    str = obj.innerText;
    val = parseInt(str);
    if(val < 8) val++;
    obj.innerText = val;
}

function sub_num(obj){
    obj = obj.parentNode.nextSibling.nextSibling;
    str = obj.innerText;
    val = parseInt(str);

    num_table = document.querySelectorAll('#fir_lecs table').length;
    if(val > num_table) val--;
    obj.innerText = val;
}

function sol_puz(obj){
    data1 = []
    data2 = []

    //data1에 1순위들을 넣는다.
    push_lec(data1, 1);

    //data2에 2순위들을 넣는다.
    push_lec(data2, 2);

    // 강의들의 시간들 정렬 - 혹시몰라서
    for(let i = 0; i < data1.length; i++){
        data1[i].IDS.sort();
    }
    for(let i = 0; i < data2.length; i++){
        data2[i].IDS.sort();
    }

    // 원래 있던 스케줄(노드)들 제거
    q = '#sol_result';
    ch_list =document.querySelector(q).childNodes;
    list_len = ch_list.length; 
    for(let i = 0; i < list_len; i++){
        ch_list[0].remove();
    }

    // 에러체크
    if(ck_toterr(data1, data2) == true) return;

    // 스케줄들 생성
    sches = puzzling(data1, data2);

    // 스케줄들 출력
    show_sches(sches);

    // 스케줄들이 없으면 출력
    if(sches.length == 0) show_err('가능한시간표가 없어요ㅠ');
}

function push_lec(data, val){
    let q = '';
    if(val == 1){
        q = '#fir_lecs';
        obj = document.querySelector(q); // table들이 있는 div 가리킴
    }else{
        q = '#sec_lecs';
        obj = document.querySelector(q); // table들이 있는 div 가리킴
    }

    num_table = document.querySelectorAll(q + ' table').length;
    // console.log(num_table);
    
    for(let i = 1; i <= num_table; i++){
        //console.log('push'+i);
        let contact = new Object();
        read_table(q + ' table:nth-child('+i+')', contact);
        data.push(contact);
    }
}

function ck_toterr(data1, data2){
    // 들을 강의가 하나라도 있는지 체크
    if(data1.length == 0 && data2.length == 0){
        show_err('강의를 넣어주세요..');
        return true;
    }

    // 강의 갯수가 0개 인지 체크
    if(document.querySelector('#num_lec_p').innerText == '0'){
        show_err('들을 강의 갯수를 늘려주세요..');
        return true;
    }

    let err_val = 0;
    // 강의들중 잘못된 시간표 체크
    for(lec of data1){
        err_val = ck_errlec(lec);
        if(err_val == 1){
            show_err('필수로 들을 강의들 중 <br>이름이 없는 강의 존재');
            return true;
        }
        else if(err_val == 2){
            show_err('필수로 들을 강의들 중 <br>중복된 시간이 있는 강의 존재');
            return true;
        }
    }
    for(lec of data2){
        err_val = ck_errlec(lec);
        if(err_val == 1){
            show_err('선택으로 듣고싶은 강의들 중 <br>이름이 없는 강의 존재');
            return true;
        }
        else if(err_val == 2){
            show_err('선택으로 듣고싶은 강의들 중 <br>중복된 시간이 있는 강의 존재');
            return true;
        }
    }

    err_val = ck_overlap(data1);
    // 필수강의들중 겹치는것 체크
    if(err_val == 1){
        show_err('필수로 들을 강의들 중 <br>시간이 겹치는 강의쌍 존재');
        return true;
    }
    else if(err_val == 2){
        show_err('필수로 들을 강의들 중 <br>이름이 겹치는 강의쌍 존재');
        return true;
    }

    return false;
}

function ck_errlec(lec){
    // 이름이 있는지 체크
    if(lec.NAME == '') return 1;

    // 강의의 시간이 겹치는지 체크 - ex) 1교시,1교시,3교시
    for(let i = 0; i < lec.IDS.length-1; i++){
        for(let j = i+1; j < lec.IDS.length; j++){
            if(lec.IDS[i] === lec.IDS[j]) return 2;
        }
    }

    return 0;
}

function show_err(str){
    q = '#sol_result';
    p = document.createElement('p');
    p.setAttribute('id', 'no_sches');
    p.setAttribute('style', 'color: red; margin: 10px');
    p.innerHTML = str;
    document.querySelector(q).append(p);
}

function read_table(q, contact){
    //alert(q);

    num_row = document.querySelectorAll(q + ' tr').length;
    //alert(num_row);

    lec_name = document.querySelector(q + ' tr:nth-child(1) td:nth-child(1) input').value;
    
    lec_ids = []
    for(let i = 0; i < num_row-2; i++){
        lec_day = document.querySelector(q + ' tr:nth-child('+(i+3)+') td:nth-child(1) select').value;
        lec_time = document.querySelector(q + ' tr:nth-child('+(i+3)+') td:nth-child(2) select').value;    

        lec_id = 0;

        let j = 0
        for(; j < week.length; j++){
            if(week[j] == lec_day){
                lec_id += lec_times.length * j;
                break;
            }
        }
        if(j == week.length) alert('error in read_table()');

        j = 0
        for(; j < lec_times.length; j++){
            if(lec_times[j] == lec_time){
                lec_id += j;
                break;
            }
        }
        if(j == lec_times.length) alert('error in read_table()');

        lec_ids.push(lec_id);
    }

    contact.NAME = lec_name;    //강의명
    contact.IDS = lec_ids;      //강의시간들
}

function puzzling(data1, data2){
    //step1 : 공강요일이 포함된 강의 제거
    data1 = del_hol(data1); // 공강요일있는거 제거
    data2 = del_hol(data2); // 공강요일있는거 제거

    //step2 : 초기집합
    old_sches = []; // 강의들의 집합들의 집합
    new_sches = []; // 강의들의 집합들의 집합

    old_sches.push(JSON.parse(JSON.stringify(data1)));

    //step3 : 초기집합에 2순위들 넣어봄
    num_lec_p = document.querySelector('#num_lec_p');
    let num_lec = parseInt(num_lec_p.innerText);
    for(let i = data1.length; i < num_lec; i++){
        //let new_sches = new Object();
        new_sches = [];
        for(one_lec of data2){ //하나씩 스케줄들에 각각 붙여봄
            one_lec_cp = JSON.parse(JSON.stringify(one_lec));
            for(one_sche of old_sches){
                new_one_sche = JSON.parse(JSON.stringify(one_sche));

                if(ck_ov_lec_in_sche(one_lec_cp, new_one_sche) == true) continue; // 스케줄에 같은 시간이 존재
                new_one_sche.push(one_lec_cp); // 스케줄에 강의 추가

                if(ck_sche_in_sches(new_one_sche, new_sches) == true) continue; //스케줄들에 같은 스케줄이 존재
                new_sches.push(new_one_sche);
            }
        }

        old_sches = new_sches;
    }

    return old_sches;
}

function ck_overlap(data){
    for(let i = 0; i < data.length-1; i++){
        for(let j = i+1; j < data.length; j++){
            if(ck_overlap_time(data[i], data[j])) return 1; //겹치는 시간이 존재한다
            if(data[i].NAME === data[j].NAME) return 2; // 같은 강의명이 존재한다.
        }
    }

    return 0;
}

function ck_overlap_time(lec1, lec2){
    for(let i = 0; i < lec1.IDS.length; i++){
        for(let j = 0; j < lec2.IDS.length; j++){
            if(lec1.IDS[i] == lec2.IDS[j]) return true;
        }
    }

    return false;
}

function del_hol(data){
    new_data = JSON.parse(JSON.stringify(data));
    for(let i = 0; i < week.length; i++){
        hol = document.querySelector('#hol_'+i+'_inp');
        if(hol.checked){
            new_data = fil_lecs(i, new_data);
        }
    }

    return new_data;
}

function fil_lecs(i, data){
    new_data = []
    for(lec of data){
        ov_flag = 0;
        for(time of lec.IDS){
            if(parseInt(time/lec_times.length) == i) ov_flag = 1;
        }
        if(ov_flag == 1) continue;
        new_data.push(lec);
    }

    return new_data;
}

function ck_ov_lec_in_sche(lec, sche){
    // console.log('lec');
    // console.log(lec);
    // console.log('sche');
    // console.log(sche);

    for(one_lec of sche){
        if(ck_overlap_time(lec, one_lec)) return true; //겹치는 시간이 존재한다
        if(lec.NAME === one_lec.NAME) return true; // 같은 강의명이 존재한다.
    }

    return false;
}

function compare_lec(lec1, lec2){
    // console.log('lec1');
    // console.log(lec1);
    // console.log('lec2');
    // console.log(lec2);
    let eq_flag = true;

    if(lec1.NAME != lec2.NAME) eq_flag = false;

    if(JSON.stringify(lec1.IDS) != JSON.stringify(lec2.IDS)) eq_flag = false;

    if(eq_flag == false) return false;
    else return true; // 같은 강의임
    
}

function ck_sche_in_sches(sche, sches){
    // sche = JSON.parse(JSON.stringify(sche));
    // sches = JSON.parse(JSON.stringify(sches));

    // console.log('sche');
    // for(lec of sche){
    //     console.log(lec.NAME);
    // }
    // console.log('sches');
    // for(s of sches){
    //     for(lec of s){
    //         console.log(lec.NAME);
    //     }
    //     console.log('...');
    // }
    
    
    let eq_flag = false;
    for(one_sche of sches){
        if(compare_sche(sche, one_sche) == true) eq_flag = true; //같은 스케줄이 존재한다
    }

    //console.log(eq_flag);

    if(eq_flag == true) return true;
    else return false;
}

function compare_sche(sche1, sche2){ //   [lec1, lec2..]  vs  [lec1, lec2..]
    if(sche1.length != sche2.length) console.log('스케줄길이가 다름!!!!');

    for(lec1 of sche1){
        let eq_flag = false;
        for(lec2 of sche2){
            eq_flag = compare_lec(lec1, lec2); 
            if(eq_flag == true) break; // lec1은 sche2에 있다
        }
        if(eq_flag == false) return false; // lec1은 sche2에 없다
    }

    return true; // 같은 스케줄임 // 모든 강의가 같아야함
}

function show_sches(sches){
    if(sches.length != 0){
        // 스샷요청
        q = '#sol_result';
        p = document.createElement('p');
        p.setAttribute('style', 'color: rgb(128,159,255); margin: 10px');
        p.innerHTML = '스케줄들이 나왔어요!<br>저장이 안되니 스크린샷 꼭!';
        document.querySelector(q).append(p);
    }

    // 스케줄하나식 출력
    for(let i = 0; i < sches.length; i++){
        show_sche(i, sches[i]);
    }
}

function show_sche(n, sche){
    //빈 테이블 만들기
    q = '#sol_result';
    
    div = document.querySelector(q);

    tab = document.createElement('table');
    tab.setAttribute('class', 'batch_sche');
    tab.setAttribute('style', 'margin-bottom: 50px;');

    // 테이블 위에서 두줄 만들기
    for(let i = 0; i < 2; i++){
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.setAttribute('colspan', '8');
        tr.append(td);
        tab.append(tr);
    }

    // 테이블에서 나머지 만들기
    for(let i = 0; i < lec_times.length+1; i++){
        tr = document.createElement('tr');
        for(let j = 0; j < week.length+1; j++){
            td = document.createElement('td');
            tr.append(td);
        }
        tab.append(tr);
    }

    div.append(tab); // 빈 테이블 넣기

    n = n+1; // 스샷요청 p 때메

    // 넘버링넣기
    p = document.querySelector(q + ' table:nth-child('+(n+1)+') tr:nth-child(1) td:nth-child(1)');
    p.innerText = 'No. ' + n;
    
    // 월화수목금토일넣기
    for(let i = 0; i < week.length; i++){ 
        one_td = document.querySelector(q + 
            ' table:nth-child('+(n+1)+') tr:nth-child(3) td:nth-child(' + (i+2) + ')');
        one_td.innerText = week[i];
    }
    
    // 1교시~10교시넣기
    for(let i = 0; i < lec_times.length; i++){ 
        one_td = document.querySelector(q + 
            ' table:nth-child('+(n+1)+') tr:nth-child(' + (i+4) + ') td:nth-child(1)');
        one_td.innerText = lec_times[i];
    }

    // 과목리스트와 각각과목시간표에 넣기
    for(let i = 0; i < sche.length; i ++){
        // 과목이름들들어가는곳
        sec_trtd = document.querySelector(q + ' table:nth-child('+(n+1)+') tr:nth-child(2) td:nth-child(1)'); 
        p = document.createElement('p');
        p.setAttribute('style','color: rgb('
                         + colors[i][0] + ',' + colors[i][1] + ',' + colors[i][2]
                         + '); display: inline-block;');
        p.innerHTML = p.innerText + sche[i].NAME + '&nbsp;&nbsp;';
        sec_trtd.append(p);

        // 과목넣기
        for(time of sche[i].IDS){ // time에 무슨요일, 몇교시 포함됨
            let day = parseInt(time/lec_times.length); // 무슨요일 // 0,1,2,3,4,5,6
            let cls = time % lec_times.length; // 몇교시 // 0,1,2,3,4,5,6,7,8,9

            //해당요일교시 지정하기
            one_td = document.querySelector(q + 
                ' table:nth-child('+(n+1)+') tr:nth-child('+(cls+4)+') td:nth-child('+(day+2)+')'); 
            one_td.setAttribute('style','background-color: rgb('
                         + colors[i][0] + ',' + colors[i][1] + ',' + colors[i][2]
                         + ');');
            //one_td.innerText = sche[i].NAME;
        }



    }

}




function test(obj){
    data1=[
        {
            "NAME" : "example1",
            "TIME" : [0,1,2]
        },
        {
            "NAME" : "example2",
            "TIME" : [0,1,1]
        }
    ];
    data2=[
        {
            "NAME" : "example2",
            "TIME" : [0,1,1]
        },
        {
            "NAME" : "example1",
            "TIME" : [0,1,2]
        }
    ];
    data3=[
        {
            "NAME" : "example1",
            "TIME" : [2,1,2]
        },
        {
            "NAME" : "example2",
            "TIME" : [2,1,2]
        }
    ];

    console.log(JSON.stringify(data3[0].TIME) != JSON.stringify(data3[0].TIME));
    //JSON.parse(JSON.stringify(data));



    // for(let value of data1){
    //     console.log(value);
    // }

    // for(let i = 0; i < )
    // hol = document.querySelector('#hol_0_inp');
    // console.log(hol.checked);



    // data2 = JSON.parse(JSON.stringify(data1));
    
    // console.log(data1[0].TIME);
    // data1[0].TIME[0] = 99;



    // console.log(data1[0].TIME);
    // console.log(data2[0].TIME);


    // a = [1,2,3];
    // b = [1,2,3];

    // console.log(JSON.stringify(a)==JSON.stringify(b));

    // for(let i = 0; i < data3.length; i++){
    //     data3[i].TIME.sort();
    // }

    // console.log(data3);
}

function test1(data){
    
    console.log(data);
    data = test2(data);
    console.log(data);
}

function test2(data){
    new_data = [7];
    return new_data;
}
