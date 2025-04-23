// https://youtu.be/6u80k6d5sCA?si=0Qb58CtsR5U5vwGR
export interface ProjectVideo {
    videoId: string;
    thumbnail: string;
}

export interface ProjectDetail {
    client: string;
    position: string;
    design: string;
    location: string;
    area: {
        site: string;
        building: string;
        total: string;
    };
    scale: string;
    content: string[];
}

export interface Project {
    id: number;
    title: string;
    mainImage: string;
    description: string;
    categories: string[];
    detail?: ProjectDetail
    video?: ProjectVideo
    images?: string[];
    sizes?: string;
}

const nextBlobUrl = 'https://zkmpkeilkhigsc2f.public.blob.vercel-storage.com';

export const projects: Project[] = [
    {
        id: 1,
        title: "우아당 (wooadang)",
        mainImage: nextBlobUrl + '/projects/wooadang/DSC07707.webp',
        description: "우리들의 아름다운 집",
        categories: ["Architecture"],
        detail: {
            client: "Private",
            position: "Architectural Design",
            design: "NOV. 2021-AGU, 2022",
            location: "Boradong, Giheung-gu, Yongin-si, Gyeonggi-do, Republic of Korea",
            area: {
                site: "253㎡",
                building: "70.21㎡",
                total: "195.83㎡"
            },
            scale: "지상 3층",
            content: [
                "<h1>우아당의 시작</h1>",
                "<p>평소 배움에 열정이었던 건축주와의 인연으로 시작된 프로젝트였다. 프로젝트의 시작부터 마무리까지 '좋은집이란?' 이라는 물음을 우리 모두 좇았던 것 같다. 정답이 없는 물음이지만 건축을 마무리할 때까지 수 많은 선택의 기로에는 좋은집이라는 물음을 같이 고민하며 결정을 해 나아갔다.</p>",
                "<h1>우아당이란 이름의 의미</h1>",
                "<p>우아당이란 이름은 '우리들의 아름다운집', 자녀인 '나우와 노아의집', '우와~'의 감탄이 섞여있는 등의 많은 중의적인 의미를 담고있다.</p>",
                "<h1>보라동 단지의 마지막 땅</h1>",
                "<p>해당 사이트는 이미 주택단지로 조성이 되어있는 지역에 마지막으로 남아있던 곳이었다. 그렇기 때문에 기존의 단지단위의 배치에서 느낄 수 있는 리듬과 흐름을 이어받아 대지의 가능성을 최대한 끌어내보고자 하였다.</p>",
                "<h1>우아당의 구성</h1>",
                "<p>계획의 첫 선을 긋기까지 많은 시간이 걸렸다. 계획의 구체적 방향성이 잡힐 시기에 성장관리계획이 고시되면서 대지의 조건이 바뀌었다. 새로운 가능성이 생긴 대지는 새로운 계획 방향을 갖게 되었다. 변경 전 기존계획은 선큰과 스킵플로어를 통해 물리적으로 공간의 연결에 초점을 맞췄다면 다시 변경된 계획에서는 지하층을 없애고 프로그램을 지상으로 올려 내부에서 시선을 통해 시각적인 연결에 초점을 맞췄다. 때문에 차경에 대한 외부의 확장성, 가족이 갖고있는 휴먼스케일을 좀 더 신중하게 고민하였다.</p>",
                "<h1>공간 구성의 특징</h1>",
                "<p>우아당은 북쪽에 숲이 우거져 있는 마지막 지점에 위치하고 있었고, 우리는 그러한 이점을 충분히 활용하여 공간적 제약을 극복하고자 하였다. 숲과 우아당의 경계를 동일선상에 두어 극적인 공감각적 경험을 주고자 했고, 북측에 창을 보이드와 함께 크게 두어 개방감을 더했다. 가족에 대한 휴먼스케일에서 제일 중요하게 생각한 요소는 자녀의 시선이었다. 부모의 눈높이로만 볼수있는 공간을 자녀도 동시에 같이 볼 수 있는 시퀀스를 만들고자 했다.</p>",
                "<h1>디자인 특징</h1>",
                "<p>우아당은 북쪽으로 숲이 펼쳐진 거실이 숲을 바라보고 있다. 남향으로 배치된 주방으로는 채광을 확보할 수 있는 큰창을 두어 거실에서는 사계절의 변화를 느낄 수 있는 따뜻한 공간을 계획하였다. 박공지붕의 형태는 족들이 생각하는 집의 형태를 뚜렷이 드러내주고자 하였다. 구조는 목구조를 선택하였는데 특수목을 적용하여 3개 층으로 구성하였다. 3개 층으로 이루어진 우아당은 내외부적으로 모든 공간을 채우기보다는 1층에 포치공간과 3층의 테라스를 계획하여 내부이지만 다양한 외부 활동을 할 수 있는 공간을 두었다.</p>"
            ]
        },
        images: [
            nextBlobUrl + "/projects/wooadang/DJI_0363.webp",
            nextBlobUrl + "/projects/wooadang/DJI_0431.webp",
            nextBlobUrl + "/projects/wooadang/DSC07441.webp",
            nextBlobUrl + "/projects/wooadang/DSC07670.webp",
            nextBlobUrl + "/projects/wooadang/DSC07707.webp",
            nextBlobUrl + "/projects/wooadang/DSC07761.webp",
            nextBlobUrl + "/projects/wooadang/DSC07800.webp",
            nextBlobUrl + "/projects/wooadang/DSC07884.webp",
            nextBlobUrl + "/projects/wooadang/DSC07887.webp",
            nextBlobUrl + "/projects/wooadang/DSC07904.webp",
            nextBlobUrl + "/projects/wooadang/DSC07919.webp",
            nextBlobUrl + "/projects/wooadang/DSC08021.webp",
            nextBlobUrl + "/projects/wooadang/DSC08087.webp",
            nextBlobUrl + "/projects/wooadang/DSC08098.webp",
            nextBlobUrl + "/projects/wooadang/DSC08119.webp",
            nextBlobUrl + "/projects/wooadang/DSC08123.webp",
            nextBlobUrl + "/projects/wooadang/DSC08133.webp",
            nextBlobUrl + "/projects/wooadang/DSC08145.webp",
            nextBlobUrl + "/projects/wooadang/DSC08175.webp",
            nextBlobUrl + "/projects/wooadang/DSC08218.webp",
            nextBlobUrl + "/projects/wooadang/DSC08221.webp",
            nextBlobUrl + "/projects/wooadang/DSC08333.webp",
        ]
    },
    {
        id: 2,
        title: "퓨전일식 전문점 장정정",
        mainImage: nextBlobUrl + "/projects/jjj/DSC03202.webp",
        description: "전통과 현대가 만나는 공간",
        categories: ["Architecture", "Interior", "Branding"],
        detail: {
            client: "장정정",
            position: "Interior Design, Branding",
            design: "2023",
            location: "서울시 강남구",
            area: {
                site: "-",
                building: "-",
                total: "132㎡"
            },
            scale: "1층",
            content: [
                "<h1>브랜드 스토리</h1>",
                "<p>삼성역 포스코 근처에서 직장인들 사이에서 소문난 맛집으로 '낮에는 밥집, 밤에는 술집'이라는 슬로건 아래 낮에는 덮밥 위주로 밤에는 해산물을 활용한 다양한 안주요리와 꼬치구이를 만드는 곳이었습니다. 너무 많은 사랑을 받은 장정정 삼성점을 선릉으로 새롭게 확장이전하며 공간브랜딩을 바탕으로 새롭게 리뉴얼하는 프로젝트가 되었습니다.</p>",
                "<h1>장정정의 의미</h1>",
                "<p>한자의 말 속에 들어있는 뜻과 같이 젊고 기운좋은 남자들이 일하는 모습이 연상됩니다. 더불어 열정 가득한 장정들이 모인 주방에서는 칼과 불을 사용하며 맛있는 요리를 준비하는 모습을 볼 수 있는 공간입니다.</p>",
                "<h1>디자인 컨셉</h1>",
                "<p>이러한 특성을 반영하기 위해, 아틀리에소우는 불, 쇠, 돌을 연상시키는 재료를 사용하여 '대장간'이라는 컨셉으로 공간 디자인을 진행했습니다. 구조와 가구, 마감재에서 느껴지는 모습은 장정정의 아이덴티티를 건축 외관부터 내부 구조, 가구까지 그 정체성이 드러날 수 있도록 시각화 했습니다.</p>",
                "<h1>공간의 특징</h1>",
                "<p>장정정은 열정 가득한 사내들이 모여 정성 가득한 요리를 만들어 내는 공간입니다. 이러한 공간에서 그들의 정직한 마음, 열정 가득한 마음을 방문한 손님들께 고스란히 느껴질 수 있는 모습을 상상했습니다. 그 상상은 장정정의 바테이블에서도 힘껏 표현됩니다. 불과 쇠, 열기와 섬세함. 성질의 조합은 우리가 나아가는 방향성에 있어서 중요한 요소가 됩니다.</p>",
                "<h1>마무리</h1>",
                "<p>이처럼 불, 쇠, 돌이라는 물성을 가진 물체들이 하나로 교차하는 지점에서 장정정의 이야기는 완성됩니다. 아틀리에소우는 장정정 선릉점을 찾는 고객들에게 장정정의 맛과 함께 공간이 주는 이야기를 전달하고, 소통하며 방문해주신 분들에게 새로운 감동을 주는 장소이길 바랍니다.</p>"
            ]
        },
        video: {
            videoId: "nZ20b553qco",
            thumbnail: "https://i.ytimg.com/vi/nZ20b553qco/maxresdefault.jpg"
        },
        images: [
            nextBlobUrl + "/projects/jjj/DSC03150.webp",
            nextBlobUrl + "/projects/jjj/DSC03152.webp",
            nextBlobUrl + "/projects/jjj/DSC03154.webp",
            nextBlobUrl + "/projects/jjj/DSC03164.webp",
            nextBlobUrl + "/projects/jjj/DSC03166.webp",
            nextBlobUrl + "/projects/jjj/DSC03167.webp",
            nextBlobUrl + "/projects/jjj/DSC03170.webp",
            nextBlobUrl + "/projects/jjj/DSC03174.webp",
            nextBlobUrl + "/projects/jjj/DSC03179.webp",
            nextBlobUrl + "/projects/jjj/DSC03184.webp",
            nextBlobUrl + "/projects/jjj/DSC03185.webp",
            nextBlobUrl + "/projects/jjj/DSC03186.webp",
            nextBlobUrl + "/projects/jjj/DSC03188.webp",
            nextBlobUrl + "/projects/jjj/DSC03196.webp",
            nextBlobUrl + "/projects/jjj/DSC03202.webp",
            nextBlobUrl + "/projects/jjj/DSC03214.webp",
            nextBlobUrl + "/projects/jjj/DSC03219.webp",
            nextBlobUrl + "/projects/jjj/DSC03222.webp",
            nextBlobUrl + "/projects/jjj/DSC03226.webp",
            nextBlobUrl + "/projects/jjj/DSC03227.webp",
            nextBlobUrl + "/projects/jjj/DSC03231.webp",
            nextBlobUrl + "/projects/jjj/DSC03240.webp",
            nextBlobUrl + "/projects/jjj/DSC03244.webp",
            nextBlobUrl + "/projects/jjj/DSC03252.webp",
            nextBlobUrl + "/projects/jjj/DSC03254.webp",
            nextBlobUrl + "/projects/jjj/DSC03256.webp",
            nextBlobUrl + "/projects/jjj/DSC03257.webp",
            nextBlobUrl + "/projects/jjj/DSC03263.webp",
            nextBlobUrl + "/projects/jjj/DSC03296.webp",
            nextBlobUrl + "/projects/jjj/DSC03300.webp",
            nextBlobUrl + "/projects/jjj/DSC03309.webp",
            nextBlobUrl + "/projects/jjj/DSC03338.webp",
            nextBlobUrl + "/projects/jjj/DSC03354.webp",
            nextBlobUrl + "/projects/jjj/DSC03356.webp",
            nextBlobUrl + "/projects/jjj/DSC03360.webp",
            nextBlobUrl + "/projects/jjj/DSC03365.webp",
            nextBlobUrl + "/projects/jjj/DSC03375.webp",
            nextBlobUrl + "/projects/jjj/DSC03377.webp",
            nextBlobUrl + "/projects/jjj/DSC03380.webp",
            nextBlobUrl + "/projects/jjj/DSC03384.webp",
            nextBlobUrl + "/projects/jjj/DSC03425.webp",
            nextBlobUrl + "/projects/jjj/DSC03426.webp",
            nextBlobUrl + "/projects/jjj/DSC03430.webp",
            nextBlobUrl + "/projects/jjj/DSC03433.webp",
            nextBlobUrl + "/projects/jjj/DSC03434.webp",
            nextBlobUrl + "/projects/jjj/DSC03435.webp",
            nextBlobUrl + "/projects/jjj/DSC03436.webp",
        ],
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
    },
    {
        id: 3,
        title: "아리랑 도원",
        mainImage: nextBlobUrl + '/projects/arirang/DSCF7056.webp',
        description: "일상과 비일상의 경계에서 탄생한 아리랑도원",
        categories: ["Architecture", "Interior", "Branding"],
        detail: {
            client: "아리랑 도원",
            position: "Architectural Design, Interior Design, Branding",
            design: "2023",
            location: "대한민국, 경기도 용인시",
            area: {
                site: "-",
                building: "-",
                total: "970.89㎡"
            },
            scale: "지상 2층",
            content: [
                "<h1>일상과 비일상의 경계에서 탄생한 아리랑도원</h1>",
                "<p>처음 '통삼리 603'이라는 주소를 찍고 그 땅을 찾았을 때, 우리는 생각했다. 만약 일상적인 하루 속에서 이곳을 방문한다면, 어떻게 일상과 비일상의 경계를 공간적으로 표현할 수 있을까?</p>",
                "<p>아리랑도원은 평범한 길목에 자리하고 있어서, 겉보기에는 눈에 띄지 않는 공장형 건물처럼 보인다. 하지만 그 내부로 한 걸음 내딛는 순간, 완전히 다른 세계가 펼쳐진다. 우리는 이 순간의 전환을 강조하기 위해 전면 파사드에 물의 장벽을 설계했다. 이 물의 흐름은 일상에서 비일상으로 넘어가는 경계 역할을 하며, 방문객들에게 시각적 즐거움과 차분한 분위기를 선사한다.</p>",
                "<p>공간에 들어서면 중앙에 크게 마련된 보이드 공간이 눈에 들어온다. 이 공간을 통해 1층과 2층 어디에서나 한국 전통 문화의 상징인 '일월오봉도'를 현대적으로 재해석한 폭포와 산새를 감상할 수 있다. 자연과 전통이 어우러진 이 풍경은 모든 이들에게 공평한 시각적 휴식을 제공하며, 일상의 번잡함을 잊고 비일상의 휴식을 취할 수 있는 특별한 경험을 선사한다.</p>",
                "<h1>“한국적인”과 “커피”라는 대비의 만남</h1>",
                "<p>커피는 우리 시대에서 가장 흔한 음료가 되었다.</p>",
                "<p>한국에서도 스페셜티 커피가 성장하면서 커피를 연구하는 사람들이 많아졌다. 아리랑도원은 이러한 커피에 대해 서구적인 관점에서만 바라보지 않고 한국의 정서가 담긴 장소에서 우리나라 사람들이 공감할 수 있는 커피의 미학을 담아내는데 목표하였다.</p>",
                "<p>누구나 스스로가 사랑하는 맛을 찾아갈 수 있도록 공간에 녹여내고 싶었다.</p>",
                "<p>외부는 일상에서 볼 수 있는 공장형 건물로 계획하되, 사선으로 올라간 지붕 형태로 매스감을 주고 이는 내부로 평쳐지는 자연배경과 빛을 끌어들일 수 있는 매개가 되도록 했다. 처음으로 마주하는 공간은 아리랑도원의 철학을 반영한 공간으로 자연아래 오리지널리티를 구현하는 로스팅바를 배치하였다. 우리는 방문하는 사람들이 커피에 대한 여정을 통해 그들이 사랑할 수 있는 커피를 경험할 수 있는 시향존을 로스팅바 맞은편에 구성하였다. 입장하며 주문을 하러가는 순간까지 스스로가 사랑하는 맛을 찾아갈 수 있는 여정이 되기를 바랬다.</p>",
                "<h1>도원의 도화지</h1>",
                "<p>아리랑도원의 벽은 두곳을 제외하고 모두 먹색이다.</p>",
                "<p>그 두곳은 마치 붓을 기다리고 있는 도화지처럼 하얀벽이다.</p>",
                "<h1>진심(眞心)</h1>",
                "<p>아리랑도원은 이름과도 같이 한국적인 맛과 멋에 진심이다.</p>",
                "<p>한국의 수묵에 영감을 받아 자연스레 스며드는 멋을 표현하고자 하였다.</p>",
                "<p>다양한 방법을 고심하던 중 우리는 퍼포먼스를 고안해냈다.</p>",
                "<h1>수묵(水墨)</h1>",
                "<p>수묵화(水墨畵)는 아마도 동양화가 서양화와 다른 점을 단적으로 표현하는 개념이다. 서양에서 색으로 간주하지 않는 흑과 백을 중심으로 표현한다. 한국적인 멋을 표현하기에 수묵에 영감을 얻은 우리는 행위적으로 그 미감으로 남기고자 하였다.</p>",
                "<p>한명의 무용수가 큰 붓을 들고 아리랑도원을 영위하며 그 곳의 비일상을 느끼며 표현해내는 모습을 상상했다.</p>",
                "<p>아리랑도원은 일상과 비일상의 경계에서 탄생한 공간으로, 전통과 현대, 자연과 건축이 조화를 이루는 특별한 휴식처다. 이곳에서 방문객들은 커피 한 잔과 함께 한국적인 아름다움을 느끼며, 자신의 일상에 새로운 영감을 얻기를 바란다.</p>"
            ],
        },
        video: {
            videoId: "XpkhFXOHJXw",
            thumbnail: "https://i.ytimg.com/vi/XpkhFXOHJXw/maxresdefault.jpg"
        },
        images: [
            nextBlobUrl + '/projects/arirang/DJI_0025.webp',
            nextBlobUrl + '/projects/arirang/DJI_0031.webp',
            nextBlobUrl + '/projects/arirang/DJI_0064.webp',
            nextBlobUrl + '/projects/arirang/DSCF6418.webp',
            nextBlobUrl + '/projects/arirang/DSCF6431.webp',
            nextBlobUrl + '/projects/arirang/DSCF6465.webp',
            nextBlobUrl + '/projects/arirang/DSCF6469.webp',
            nextBlobUrl + '/projects/arirang/DSCF6474.webp',
            nextBlobUrl + '/projects/arirang/DSCF6475.webp',
            nextBlobUrl + '/projects/arirang/DSCF6487.webp',
            nextBlobUrl + '/projects/arirang/DSCF6608.webp',
            nextBlobUrl + '/projects/arirang/DSCF6674.webp',
            nextBlobUrl + '/projects/arirang/DSCF6676.webp',
            nextBlobUrl + '/projects/arirang/DSCF6693.webp',
            nextBlobUrl + '/projects/arirang/DSCF6697.webp',
            nextBlobUrl + '/projects/arirang/DSCF6712.webp',
            nextBlobUrl + '/projects/arirang/DSCF6726.webp',
            nextBlobUrl + '/projects/arirang/DSCF6731.webp',
            nextBlobUrl + '/projects/arirang/DSCF6742.webp',
            nextBlobUrl + '/projects/arirang/DSCF6775.webp',
            nextBlobUrl + '/projects/arirang/DSCF6800.webp',
            nextBlobUrl + '/projects/arirang/DSCF6801.webp',
            nextBlobUrl + '/projects/arirang/DSCF6821.webp',
            nextBlobUrl + '/projects/arirang/DSCF6826.webp',
            nextBlobUrl + '/projects/arirang/DSCF6831.webp',
            nextBlobUrl + '/projects/arirang/DSCF6841.webp',
            nextBlobUrl + '/projects/arirang/DSCF6988.webp',
            nextBlobUrl + '/projects/arirang/DSCF7032.webp',
            nextBlobUrl + '/projects/arirang/DSCF7050.webp',
            nextBlobUrl + '/projects/arirang/DSCF7051.webp',
            nextBlobUrl + '/projects/arirang/DSCF7053.webp',
            nextBlobUrl + '/projects/arirang/DSCF7056.webp',
            nextBlobUrl + '/projects/arirang/DSCF7057.webp',
            nextBlobUrl + '/projects/arirang/DSCF7063.webp',
        ]
    },
    {
        id: 4,
        title: "삐삣버거 스타필드 수원 지점",
        mainImage: nextBlobUrl + '/projects/pp-burger/DSCF1985.webp',
        description: "즐거움이 가득한 버거 레스토랑",
        categories: ["Architecture", "Interior", "Branding"],
        detail: {
            client: "삐삣버거",
            position: "Interior Design, Branding",
            design: "2023.12",
            location: "경기도 수원시 장안구 정자동 스타필드수원",
            area: {
                site: "-",
                building: "-",
                total: "119㎡"
            },
            scale: "1층",
            content: [
                "<h1>삐삣버거 - 수원스타필드</h1>",
                "<p>아메리칸 수제버거에 대한 정통성과 깊은 철학을 바탕으로 성장해온 삐삣버거의 수원 스타필드점을 디자인하게 되었다.</p>",
                "<h1>디자인의 방향</h1>",
                "<p>일반적으로 전체적인 디자인 구상을 위해 테마가 될 수 있는 디자인컨셉을 정의하고 시작하는 편이지만, 이번 삐삣버거 프로젝트는 브랜드 자체의 철학과 색깔이 명확하여 컨셉을 정하기 보다 브랜드를 더 돋보이게 하는 포인트를 찾기로 하였다.</p>",
                "<h1>디자인 전략</h1>",
                "<p>매장이 푸드코트와 즐길 거리가 많은 엔터존 사이에 위치하고 있기 때문에 북적이는 공간에서 즐겁게 나들이 후 지인 혹은 가족과 휴식하는 모습을 상상하면서 마치 70-80년대의 미국 레스토랑을 방문한 것 같은 경험을 주고 싶었다. 또한 공간을 방문하였을 때 따듯함과 넉넉함을 전달하고자 하였다.</p>",
                "<h1>디자인 구성</h1>",
                "<p>전체적인 톤은 브라운과 화이트를 통해 따스함과 깔끔한 이미지를 주었다. 파사드와 내부 공간 경험은 미국 레스토랑의 레트로한 감성을 현대적으로 표현하기 위해 정사각형 비율의 타일을 사용하였는데, 메인이 되는 홀에는 다이아몬드 패턴으로 변화를 주어 시각적으로 재미있는 풍경을 주고 싶었다.</p>",
            ]
        },
        video: {
            videoId: "v2maNVn1Kcs",
            thumbnail: "https://i.ytimg.com/vi/v2maNVn1Kcs/maxresdefault.jpg"
        },
        images: [
            nextBlobUrl + "/projects/pp-burger/DSCF1752.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1802.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1888.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1891.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1896.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1901.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1908.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1910.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1912.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1915.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1927.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1961.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1963.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1968.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1974.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1976.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1980.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1985.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1988.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1989.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1991.webp",
            nextBlobUrl + "/projects/pp-burger/DSCF1995.webp",
        ]
    }
];