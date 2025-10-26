// ====================================
// 可轉債競拍查詢系統 - 主程式
// ====================================

'use strict';

// ========== 應用程式狀態管理 ==========
const AppState = {
    auctionData: [],
    filteredData: [],
    sortConfig: {
        key: null,
        direction: 'asc'
    }
};

// ========== 完整資料 ==========
const AUCTION_DATA = [
    {no: 262, date: '2025/5/19', stockCode: '6117', cbCode: '61172', name: '迎廣二', capital: 9.19, scale: '5.0億', period: '3年', secured: 'No', rating: 7, volume: 4250, floor: 100.0, cutoffDate: '2025/5/15', cutoffPrice: 92.00, convPrice: 79.30, pricePremium: '102.00%', theoretical: 116.02, minBid: 108.50, minPremium: -6.5, maxBid: 120.00, maxPremium: 3.4, avgBid: 110.73, avgPremium: -4.6, listHigh: 129.00, listLow: 109.80},
    {no: 263, date: '2025/5/20', stockCode: '1472', cbCode: '14722', name: '三洋實業二', capital: 5.25, scale: '3.0億', period: '3年', secured: 'Yes', rating: 7, volume: 2550, floor: 100.0, cutoffDate: '2025/5/16', cutoffPrice: 107.00, convPrice: 102.00, pricePremium: '102.48%', theoretical: 104.90, minBid: 108.36, minPremium: 3.3, maxBid: 115.40, maxPremium: 10.0, avgBid: 110.71, avgPremium: 5.5, listHigh: 110.30, listLow: 104.00},
    {no: 264, date: '2025/5/28', stockCode: '4555', cbCode: '45554', name: '氣立四', capital: 7.00, scale: '5.0億', period: '3年', secured: 'Yes', rating: 6, volume: 4250, floor: 102.0, cutoffDate: '2025/5/26', cutoffPrice: 41.20, convPrice: 44.00, pricePremium: '104.76%', theoretical: 93.64, minBid: 102.00, minPremium: 8.9, maxBid: 107.11, maxPremium: 14.4, avgBid: 103.28, avgPremium: 10.3, listHigh: 119.50, listLow: 100.00},
    {no: 265, date: '2025/6/4', stockCode: '3653', cbCode: '36535', name: '健策五', capital: 14.29, scale: '20.0億', period: '5年', secured: 'No', rating: 3, volume: 17012, floor: 105.0, cutoffDate: '2025/6/2', cutoffPrice: 1320.00, convPrice: 1320.90, pricePremium: '102.00%', theoretical: 99.93, minBid: 106.61, minPremium: 6.7, maxBid: 200.00, maxPremium: 100.1, avgBid: 108.37, avgPremium: 8.4, listHigh: 159.00, listLow: 115.00},
    {no: 266, date: '2025/6/5', stockCode: '3617', cbCode: '36173', name: '碩天三', capital: 9.42, scale: '15.0億', period: '3年', secured: 'No', rating: 4, volume: 12750, floor: 100.0, cutoffDate: '2025/6/3', cutoffPrice: 253.00, convPrice: 305.00, pricePremium: '114.66%', theoretical: 82.95, minBid: 100.00, minPremium: 20.6, maxBid: 270.00, maxPremium: 225.5, avgBid: 100.79, avgPremium: 21.5, listHigh: 111.00, listLow: 99.85},
    {no: 267, date: '2025/6/6', stockCode: '2351', cbCode: '23511', name: '順德一', capital: 18.21, scale: '12.0億', period: '3年', secured: 'No', rating: 5, volume: 10200, floor: 100.0, cutoffDate: '2025/6/4', cutoffPrice: 71.30, convPrice: 75.00, pricePremium: '104.90%', theoretical: 95.07, minBid: 100.14, minPremium: 5.3, maxBid: 107.51, maxPremium: 13.1, avgBid: 102.18, avgPremium: 7.5, listHigh: 132.00, listLow: 102.20},
    {no: 268, date: '2025/6/11', stockCode: '1466', cbCode: '14664', name: '聚隆四', capital: 11.12, scale: '4.0億', period: '3年', secured: 'Yes', rating: 7, volume: 3400, floor: 100.0, cutoffDate: '2025/6/9', cutoffPrice: 16.80, convPrice: 18.80, pricePremium: '104.00%', theoretical: 89.36, minBid: 101.00, minPremium: 13.0, maxBid: 108.00, maxPremium: 20.9, avgBid: 103.11, avgPremium: 15.4, listHigh: 107.80, listLow: 103.00},
    {no: 269, date: '2025/6/17', stockCode: '6538', cbCode: '65381', name: '倉和一', capital: 3.81, scale: '3.0億', period: '5年', secured: 'No', rating: 5, volume: 2550, floor: 101.0, cutoffDate: '2025/6/13', cutoffPrice: 108.00, convPrice: 112.00, pricePremium: '102.30%', theoretical: 96.43, minBid: 101.30, minPremium: 5.1, maxBid: 106.22, maxPremium: 10.2, avgBid: 102.54, avgPremium: 6.3, listHigh: 101.00, listLow: 92.50},
    {no: 270, date: '2025/6/19', stockCode: '2247', cbCode: '22472', name: '汎德二', capital: 8.07, scale: '10.0億', period: '3年', secured: 'No', rating: 4, volume: 8500, floor: 101.0, cutoffDate: '2025/6/17', cutoffPrice: 289.00, convPrice: 297.80, pricePremium: '102.50%', theoretical: 97.04, minBid: 101.55, minPremium: 4.6, maxBid: 200.00, maxPremium: 106.1, avgBid: 102.37, avgPremium: 5.5, listHigh: 119.95, listLow: 102.00},
    {no: 271, date: '2025/6/19', stockCode: '2530', cbCode: '25304', name: '華建四', capital: 84.00, scale: '10.0億', period: '3年', secured: 'No', rating: 7, volume: 7180, floor: 100.0, cutoffDate: '2025/6/17', cutoffPrice: 32.45, convPrice: 32.50, pricePremium: '102.30%', theoretical: 99.85, minBid: 100.00, minPremium: 0.2, maxBid: 110.00, maxPremium: 10.2, avgBid: 100.37, avgPremium: 0.5, listHigh: 99.60, listLow: 92.40},
    {no: 272, date: '2025/7/17', stockCode: '6469', cbCode: '64693', name: '大樹三', capital: 14.97, scale: '10.0億', period: '3年', secured: 'No', rating: 4, volume: 8650, floor: 100.0, cutoffDate: '2025/7/15', cutoffPrice: 143.50, convPrice: 149.74, pricePremium: '102.00%', theoretical: 95.83, minBid: 101.51, minPremium: 5.9, maxBid: 109.00, maxPremium: 13.7, avgBid: 102.20, avgPremium: 6.6, listHigh: 118.50, listLow: 108.60},
    {no: 273, date: '2025/7/23', stockCode: '8411', cbCode: '84113', name: '福貞三KY', capital: 21.84, scale: '12.0億', period: '5年', secured: 'Yes', rating: 6, volume: 10200, floor: 100.0, cutoffDate: '2025/7/21', cutoffPrice: 13.20, convPrice: 13.40, pricePremium: '103.00%', theoretical: 98.51, minBid: 100.00, minPremium: 1.5, maxBid: 103.60, maxPremium: 5.2, avgBid: 100.49, avgPremium: 2.0, listHigh: 102.30, listLow: 99.30},
    {no: 274, date: '2025/7/24', stockCode: '6982', cbCode: '69822', name: '大井泵浦二', capital: 4.03, scale: '2.0億', period: '3年', secured: 'No', rating: 7, volume: 1709, floor: 100.0, cutoffDate: '2025/7/22', cutoffPrice: 62.50, convPrice: 61.80, pricePremium: '102.10%', theoretical: 101.13, minBid: 100.00, minPremium: -1.1, maxBid: 109.91, maxPremium: 8.7, avgBid: 101.16, avgPremium: 0.0, listHigh: 120.00, listLow: 102.05},
    {no: 275, date: '2025/7/24', stockCode: '6843', cbCode: '68431', name: '進典一', capital: 3.33, scale: '3.0億', period: '3年', secured: 'No', rating: 6, volume: 2700, floor: 101.0, cutoffDate: '2025/7/22', cutoffPrice: 59.80, convPrice: 61.40, pricePremium: '102.56%', theoretical: 97.39, minBid: 101.01, minPremium: 3.7, maxBid: 105.91, maxPremium: 8.7, avgBid: 101.83, avgPremium: 4.6, listHigh: 114.30, listLow: 102.00},
    {no: 276, date: '2025/7/25', stockCode: '3131', cbCode: '31312', name: '弘塑二', capital: 2.92, scale: '10.0億', period: '5年', secured: 'No', rating: 5, volume: 8500, floor: 103.0, cutoffDate: '2025/7/23', cutoffPrice: 1565.00, convPrice: 1649.20, pricePremium: '102.01%', theoretical: 94.89, minBid: 109.14, minPremium: 15.0, maxBid: 120.00, maxPremium: 26.5, avgBid: 110.50, avgPremium: 16.4, listHigh: 124.00, listLow: 110.30},
    {no: 277, date: '2025/7/28', stockCode: '3167', cbCode: '31672', name: '大量二', capital: 8.84, scale: '5.0億', period: '3年', secured: 'No', rating: 6, volume: 4661, floor: 100.0, cutoffDate: '2025/7/24', cutoffPrice: 168.00, convPrice: 170.00, pricePremium: '108.40%', theoretical: 98.82, minBid: 107.39, minPremium: 8.7, maxBid: 116.88, maxPremium: 18.3, avgBid: 109.09, avgPremium: 10.4, listHigh: 140.25, listLow: 113.00},
    {no: 278, date: '2025/7/28', stockCode: '2641', cbCode: '26418', name: '正德八', capital: 32.49, scale: '7.8億', period: '5年', secured: 'No', rating: 6, volume: 7020, floor: 100.5, cutoffDate: '2025/7/24', cutoffPrice: 19.50, convPrice: 19.30, pricePremium: '102.12%', theoretical: 101.04, minBid: 100.50, minPremium: -0.5, maxBid: 109.30, maxPremium: 8.2, avgBid: 101.30, avgPremium: 0.3, listHigh: 110.60, listLow: 100.00},
    {no: 279, date: '2025/8/6', stockCode: '7556', cbCode: '75562', name: '意德士二', capital: 2.73, scale: '2.0億', period: '3年', secured: 'No', rating: 6, volume: 1800, floor: 100.0, cutoffDate: '2025/8/4', cutoffPrice: 174.00, convPrice: 178.50, pricePremium: '102.00%', theoretical: 97.48, minBid: 107.50, minPremium: 10.3, maxBid: 117.00, maxPremium: 20.0, avgBid: 109.25, avgPremium: 12.1, listHigh: 124.85, listLow: 118.00},
    {no: 280, date: '2025/8/6', stockCode: '4581', cbCode: '45811', name: '光隆精密一KY', capital: 3.39, scale: '5.0億', period: '3年', secured: 'No', rating: 5, volume: 4380, floor: 100.5, cutoffDate: '2025/8/4', cutoffPrice: 52.70, convPrice: 56.70, pricePremium: '102.50%', theoretical: 92.95, minBid: 100.50, minPremium: 8.1, maxBid: 107.92, maxPremium: 16.1, avgBid: 100.94, avgPremium: 8.6, listHigh: 107.05, listLow: 99.95},
    {no: 281, date: '2025/8/19', stockCode: '4558', cbCode: '45581', name: '寶緯一', capital: 5.00, scale: '3.0億', period: '3年', secured: 'Yes', rating: 8, volume: 2624, floor: 100.0, cutoffDate: '2025/8/15', cutoffPrice: 27.50, convPrice: 29.80, pricePremium: '102.58%', theoretical: 92.28, minBid: 100.10, minPremium: 8.5, maxBid: 107.00, maxPremium: 15.9, avgBid: 101.17, avgPremium: 9.6, listHigh: 103.00, listLow: 101.00},
    {no: 282, date: '2025/8/19', stockCode: '2743', cbCode: '27431', name: '山富一', capital: 3.60, scale: '3.0億', period: '3年', secured: 'No', rating: 4, volume: 2640, floor: 102.0, cutoffDate: '2025/8/15', cutoffPrice: 106.00, convPrice: 135.00, pricePremium: '106.30%', theoretical: 78.52, minBid: 102.00, minPremium: 29.9, maxBid: 110.00, maxPremium: 40.1, avgBid: 102.31, avgPremium: 30.3, listHigh: 103.40, listLow: 102.00}
];

// ========== 工具函數 ==========
const Utils = {
    // 格式化數字
    formatNumber(num, decimals = 2) {
        return Number(num).toFixed(decimals);
    },

    // 取得數值（移除單位）
    parseScale(scaleStr) {
        return parseFloat(scaleStr.replace('億', ''));
    },

    // 取得百分比數值
    parsePercentage(percentStr) {
        return parseFloat(percentStr.replace('%', ''));
    },

    // 檢查是否在區間內
    isInRange(value, rangeStr) {
        if (!rangeStr) return true;
        const [min, max] = rangeStr.split('-').map(Number);
        return value >= min && value < max;
    },

    // 計算日期差異
    getDaysDifference(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    },

    // 計算中位數
    getMedian(numbers) {
        const sorted = [...numbers].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0
            ? (sorted[mid - 1] + sorted[mid]) / 2
            : sorted[mid];
    },

    // 防抖函數
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// ========== 日期功能 ==========
const DateModule = {
    // 顯示當前日期
    displayCurrentDate() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };
        const dateString = now.toLocaleDateString('zh-TW', options);
        const element = document.getElementById('currentDate');
        if (element) {
            element.textContent = dateString;
        }
    },

    // 設定快速期間
    setQuickPeriod() {
        const quickPeriod = document.getElementById('quickPeriod').value;
        const today = new Date('2025-08-31');
        let startDate, endDate;

        const periodMap = {
            'all': ['2025-05-01', '2025-08-31'],
            'month1': ['2025-08-01', '2025-08-31'],
            'month2': ['2025-07-01', '2025-08-31'],
            'month3': ['2025-06-01', '2025-08-31'],
            'may': ['2025-05-01', '2025-05-31'],
            'june': ['2025-06-01', '2025-06-30'],
            'july': ['2025-07-01', '2025-07-31'],
            'august': ['2025-08-01', '2025-08-31'],
            'q2': ['2025-05-01', '2025-06-30'],
            'q3': ['2025-07-01', '2025-08-31']
        };

        if (periodMap[quickPeriod]) {
            [startDate, endDate] = periodMap[quickPeriod];
            document.getElementById('startDate').value = startDate;
            document.getElementById('endDate').value = endDate;
        }
    },

    // 日期範圍篩選
    filterByDateRange(data, startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return data.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= start && itemDate <= end;
        });
    }
};

// ========== 瀏覽量追蹤 ==========
const ViewCounter = {
    // 初始化瀏覽量計數器
    initialize() {
        const today = new Date().toLocaleDateString('zh-TW');

        let viewData = JSON.parse(localStorage.getItem('cbAuctionViews') || '{}');

        if (!viewData.total) viewData.total = 0;
        if (!viewData.daily) viewData.daily = {};

        viewData.total += 1;
        if (!viewData.daily[today]) viewData.daily[today] = 0;
        viewData.daily[today] += 1;

        // 清理30天前的資料
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        Object.keys(viewData.daily).forEach(date => {
            const dateObj = new Date(date);
            if (dateObj < thirtyDaysAgo) {
                delete viewData.daily[date];
            }
        });

        localStorage.setItem('cbAuctionViews', JSON.stringify(viewData));
        this.updateDisplay(viewData.daily[today], viewData.total);
    },

    // 更新瀏覽量顯示
    updateDisplay(todayCount, totalCount) {
        this.animateNumber('todayViews', todayCount);
        this.animateNumber('totalViews', totalCount);
    },

    // 數字動畫
    animateNumber(elementId, targetNumber) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const duration = 1000;
        const startNumber = 0;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentNumber = Math.floor(progress * (targetNumber - startNumber) + startNumber);
            element.textContent = currentNumber.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }
};

// ========== 數據篩選 ==========
const DataFilter = {
    // 篩選資料
    filter() {
        const filters = this.getFilters();
        let data = DateModule.filterByDateRange(
            AUCTION_DATA,
            filters.startDate,
            filters.endDate
        );

        data = data.filter(item => {
            return this.matchesAllFilters(item, filters);
        });

        AppState.filteredData = data;
        DataDisplay.render(data);
        StatsModule.update(data);
        SummaryModule.update(data);

        if (data.length === 0) {
            alert('查無符合條件的資料，請調整篩選條件');
        }

        document.getElementById('quickPeriod').value = '';
    },

    // 取得所有篩選條件
    getFilters() {
        return {
            stockCode: document.getElementById('stockCode').value.trim(),
            cbCode: document.getElementById('cbCode').value.trim(),
            companyName: document.getElementById('companyName').value.trim(),
            securityFilter: document.getElementById('securityFilter').value,
            periodFilter: document.getElementById('periodFilter').value,
            scaleFilter: document.getElementById('scaleFilter').value,
            ratingFilter: document.getElementById('ratingFilter').value,
            capitalFilter: document.getElementById('capitalFilter').value,
            pricePremiumFilter: document.getElementById('pricePremiumFilter').value,
            listHighFilter: document.getElementById('listHighFilter').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value
        };
    },

    // 檢查項目是否符合所有篩選條件
    matchesAllFilters(item, filters) {
        const checks = [
            !filters.stockCode || item.stockCode.includes(filters.stockCode),
            !filters.cbCode || item.cbCode.includes(filters.cbCode),
            !filters.companyName || item.name.includes(filters.companyName),
            !filters.securityFilter || item.secured === filters.securityFilter,
            !filters.periodFilter || item.period === filters.periodFilter,
            this.matchScale(item, filters.scaleFilter),
            this.matchRating(item, filters.ratingFilter),
            this.matchCapital(item, filters.capitalFilter),
            this.matchPricePremium(item, filters.pricePremiumFilter),
            this.matchListHigh(item, filters.listHighFilter)
        ];

        return checks.every(check => check);
    },

    matchScale(item, filter) {
        if (!filter) return true;
        return Utils.isInRange(Utils.parseScale(item.scale), filter);
    },

    matchRating(item, filter) {
        if (!filter) return true;
        return item.rating === parseInt(filter);
    },

    matchCapital(item, filter) {
        if (!filter) return true;
        return Utils.isInRange(item.capital, filter);
    },

    matchPricePremium(item, filter) {
        if (!filter) return true;
        return Utils.isInRange(Utils.parsePercentage(item.pricePremium), filter);
    },

    matchListHigh(item, filter) {
        if (!filter) return true;
        return Utils.isInRange(item.listHigh, filter);
    },

    // 重置篩選
    reset() {
        const inputs = ['stockCode', 'cbCode', 'companyName'];
        inputs.forEach(id => document.getElementById(id).value = '');

        const selects = ['securityFilter', 'periodFilter', 'scaleFilter',
            'ratingFilter', 'capitalFilter', 'pricePremiumFilter', 'listHighFilter', 'quickPeriod'];
        selects.forEach(id => document.getElementById(id).value = '');

        document.getElementById('startDate').value = '2025-05-01';
        document.getElementById('endDate').value = '2025-08-31';

        AppState.filteredData = [...AUCTION_DATA];
        DataDisplay.render(AppState.filteredData);
        StatsModule.update(AppState.filteredData);
        SummaryModule.update(AppState.filteredData);
    }
};

// ========== 排序功能 ==========
const SortModule = {
    // 排序資料
    sort(key) {
        const direction = AppState.sortConfig.key === key && AppState.sortConfig.direction === 'asc'
            ? 'desc'
            : 'asc';

        AppState.sortConfig = { key, direction };

        AppState.filteredData.sort((a, b) => {
            let aVal = a[key];
            let bVal = b[key];

            // 處理特殊格式
            if (typeof aVal === 'string' && aVal.includes('億')) {
                aVal = Utils.parseScale(aVal);
                bVal = Utils.parseScale(bVal);
            } else if (typeof aVal === 'string' && aVal.includes('%')) {
                aVal = Utils.parsePercentage(aVal);
                bVal = Utils.parsePercentage(bVal);
            }

            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        DataDisplay.render(AppState.filteredData);
        this.updateHeaders(key, direction);
    },

    // 更新表頭樣式
    updateHeaders(key, direction) {
        document.querySelectorAll('thead th').forEach(th => {
            th.classList.remove('sorted-asc', 'sorted-desc');
        });

        const th = document.querySelector(`thead th[data-sort="${key}"]`);
        if (th) {
            th.classList.add(direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
        }
    },

    // 初始化排序功能
    initialize() {
        const sortableColumns = [
            'no', 'date', 'stockCode', 'cbCode', 'name', 'capital', 'scale',
            'rating', 'floor', 'theoretical', 'minBid', 'minPremium',
            'maxBid', 'maxPremium', 'avgBid', 'avgPremium', 'listHigh', 'listLow'
        ];

        const ths = document.querySelectorAll('thead th');
        ths.forEach((th, index) => {
            if (sortableColumns[index]) {
                th.setAttribute('data-sort', sortableColumns[index]);
                th.classList.add('sortable');
                th.style.cursor = 'pointer';
                th.addEventListener('click', () => this.sort(sortableColumns[index]));
            }
        });
    }
};

// ========== 數據顯示 ==========
const DataDisplay = {
    // 渲染表格
    render(data) {
        const tbody = document.getElementById('tableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        data.forEach(item => {
            const row = this.createRow(item);
            tbody.appendChild(row);
        });
    },

    // 創建表格行
    createRow(item) {
        const row = document.createElement('tr');
        const minPremiumClass = item.minPremium >= 0 ? 'positive' : 'negative';
        const maxPremiumClass = item.maxPremium >= 0 ? 'positive' : 'negative';
        const avgPremiumClass = item.avgPremium >= 0 ? 'positive' : 'negative';

        row.innerHTML = `
            <td>${item.no}</td>
            <td>${item.date}</td>
            <td class="cb-code">${item.stockCode}</td>
            <td class="cb-code">${item.cbCode}</td>
            <td style="text-align: left; white-space: nowrap;">${item.name}</td>
            <td>${item.capital}</td>
            <td>${item.scale}</td>
            <td>${item.period}</td>
            <td><span class="badge ${item.secured === 'Yes' ? 'badge-yes' : 'badge-no'}">${item.secured === 'Yes' ? '有' : '無'}</span></td>
            <td>${item.rating}</td>
            <td>${item.volume.toLocaleString()}</td>
            <td>${item.floor.toFixed(1)}</td>
            <td>${item.cutoffDate}</td>
            <td>${item.cutoffPrice.toFixed(2)}</td>
            <td>${item.convPrice.toFixed(2)}</td>
            <td>${item.pricePremium}</td>
            <td>${item.theoretical.toFixed(2)}</td>
            <td>${item.minBid.toFixed(2)}</td>
            <td class="${minPremiumClass}">${item.minPremium.toFixed(1)}%</td>
            <td>${item.maxBid.toFixed(2)}</td>
            <td class="${maxPremiumClass}">${item.maxPremium.toFixed(1)}%</td>
            <td>${item.avgBid.toFixed(2)}</td>
            <td class="${avgPremiumClass}">${item.avgPremium.toFixed(1)}%</td>
            <td>${item.listHigh.toFixed(2)}</td>
            <td>${item.listLow.toFixed(2)}</td>
        `;

        return row;
    }
};

// ========== 統計模組 ==========
const StatsModule = {
    // 更新統計
    update(data) {
        if (data.length === 0) {
            this.showEmpty();
            return;
        }

        this.updatePeriod();
        this.updateBasicStats(data);
        this.updatePremiumStats(data);
        this.updateOtherStats(data);
    },

    // 顯示空資料
    showEmpty() {
        const emptyFields = ['periodRange', 'totalCount', 'totalScale', 'avgScale',
            'avgPremium', 'maxPremium', 'minPremium', 'medianPremium',
            'securedRatio', 'period3Ratio', 'avgRating', 'avgListGain'];

        emptyFields.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = '-';
        });

        const element = document.getElementById('periodDays');
        if (element) element.textContent = '';
    },

    // 更新期間
    updatePeriod() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const daysDiff = Utils.getDaysDifference(startDate, endDate);

        const periodRange = document.getElementById('periodRange');
        const periodDays = document.getElementById('periodDays');

        if (periodRange) {
            periodRange.textContent = `${start.getMonth() + 1}/${start.getDate()} - ${end.getMonth() + 1}/${end.getDate()}`;
        }
        if (periodDays) {
            periodDays.textContent = `${daysDiff}天`;
        }
    },

    // 更新基本統計
    updateBasicStats(data) {
        const totalCount = document.getElementById('totalCount');
        if (totalCount) totalCount.textContent = data.length;

        const totalScale = data.reduce((sum, item) => sum + Utils.parseScale(item.scale), 0);
        const totalScaleEl = document.getElementById('totalScale');
        const avgScaleEl = document.getElementById('avgScale');

        if (totalScaleEl) totalScaleEl.textContent = totalScale.toFixed(1);
        if (avgScaleEl) avgScaleEl.textContent = (totalScale / data.length).toFixed(1);
    },

    // 更新溢價統計
    updatePremiumStats(data) {
        const avgPremium = data.reduce((sum, item) => sum + item.avgPremium, 0) / data.length;
        const avgPremiumEl = document.getElementById('avgPremium');
        if (avgPremiumEl) avgPremiumEl.textContent = avgPremium.toFixed(1) + '%';

        const maxPremiumItem = data.reduce((max, item) =>
            item.maxPremium > max.maxPremium ? item : max);
        const maxPremiumEl = document.getElementById('maxPremium');
        const maxPremiumName = document.getElementById('maxPremiumName');
        if (maxPremiumEl) maxPremiumEl.textContent = maxPremiumItem.maxPremium.toFixed(1) + '%';
        if (maxPremiumName) maxPremiumName.textContent = maxPremiumItem.name;

        const minPremiumItem = data.reduce((min, item) =>
            item.minPremium < min.minPremium ? item : min);
        const minPremiumEl = document.getElementById('minPremium');
        const minPremiumName = document.getElementById('minPremiumName');
        if (minPremiumEl) minPremiumEl.textContent = minPremiumItem.minPremium.toFixed(1) + '%';
        if (minPremiumName) minPremiumName.textContent = minPremiumItem.name;

        const medianPremium = Utils.getMedian(data.map(item => item.avgPremium));
        const medianPremiumEl = document.getElementById('medianPremium');
        if (medianPremiumEl) medianPremiumEl.textContent = medianPremium.toFixed(1) + '%';
    },

    // 更新其他統計
    updateOtherStats(data) {
        const securedCount = data.filter(item => item.secured === 'Yes').length;
        const securedRatio = (securedCount / data.length * 100).toFixed(1);
        const securedRatioEl = document.getElementById('securedRatio');
        const securedCountEl = document.getElementById('securedCount');
        if (securedRatioEl) securedRatioEl.textContent = securedRatio + '%';
        if (securedCountEl) securedCountEl.textContent = `${securedCount}檔`;

        const period3Count = data.filter(item => item.period === '3年').length;
        const period3Ratio = (period3Count / data.length * 100).toFixed(1);
        const period3RatioEl = document.getElementById('period3Ratio');
        const period3CountEl = document.getElementById('period3Count');
        if (period3RatioEl) period3RatioEl.textContent = period3Ratio + '%';
        if (period3CountEl) period3CountEl.textContent = `${period3Count}檔`;

        const avgRating = data.reduce((sum, item) => sum + item.rating, 0) / data.length;
        const avgRatingEl = document.getElementById('avgRating');
        if (avgRatingEl) avgRatingEl.textContent = avgRating.toFixed(1);

        const avgListGain = data.reduce((sum, item) => {
            const gain = ((item.listHigh - item.avgBid) / item.avgBid * 100);
            return sum + gain;
        }, 0) / data.length;
        const avgListGainEl = document.getElementById('avgListGain');
        if (avgListGainEl) avgListGainEl.textContent = avgListGain.toFixed(1) + '%';
    }
};

// ========== 匯總模組 ==========
const SummaryModule = {
    // 更新匯總
    update(data) {
        const summarySection = document.getElementById('summarySection');
        if (!summarySection) return;

        if (data.length === 0) {
            summarySection.style.display = 'none';
            return;
        }

        summarySection.style.display = 'block';

        this.updateCount(data);
        this.updateAverages(data);
        this.updateBidStats(data);
        this.updateListStats(data);
    },

    updateCount(data) {
        this.setElement('sumCount', data.length);

        const avgCapital = data.reduce((sum, item) => sum + item.capital, 0) / data.length;
        this.setElement('sumAvgCapital', avgCapital.toFixed(2) + '億');

        const avgScale = data.reduce((sum, item) => sum + Utils.parseScale(item.scale), 0) / data.length;
        this.setElement('sumAvgScale', avgScale.toFixed(2) + '億');

        const avgRating = data.reduce((sum, item) => sum + item.rating, 0) / data.length;
        this.setElement('sumAvgRating', avgRating.toFixed(2) + '分');

        const securedCount = data.filter(item => item.secured === 'Yes').length;
        const securedRatio = (securedCount / data.length * 100);
        this.setElement('sumSecuredRatio', securedRatio.toFixed(1) + '%');
    },

    updateAverages(data) {
        const avgFloor = data.reduce((sum, item) => sum + item.floor, 0) / data.length;
        this.setElement('sumAvgFloor', avgFloor.toFixed(2));

        const avgTheoretical = data.reduce((sum, item) => sum + item.theoretical, 0) / data.length;
        this.setElement('sumAvgTheoretical', avgTheoretical.toFixed(2));
    },

    updateBidStats(data) {
        const avgMinBid = data.reduce((sum, item) => sum + item.minBid, 0) / data.length;
        this.setElement('sumAvgMinBid', avgMinBid.toFixed(2));

        const avgMinPremium = data.reduce((sum, item) => sum + item.minPremium, 0) / data.length;
        this.setElement('sumAvgMinPremium', avgMinPremium.toFixed(2) + '%');

        const avgMaxBid = data.reduce((sum, item) => sum + item.maxBid, 0) / data.length;
        this.setElement('sumAvgMaxBid', avgMaxBid.toFixed(2));

        const avgMaxPremium = data.reduce((sum, item) => sum + item.maxPremium, 0) / data.length;
        this.setElement('sumAvgMaxPremium', avgMaxPremium.toFixed(2) + '%');

        const avgBid = data.reduce((sum, item) => sum + item.avgBid, 0) / data.length;
        this.setElement('sumAvgBid', avgBid.toFixed(2));

        const avgPremium = data.reduce((sum, item) => sum + item.avgPremium, 0) / data.length;
        this.setElement('sumAvgPremium', avgPremium.toFixed(2) + '%');
    },

    updateListStats(data) {
        const avgListHigh = data.reduce((sum, item) => sum + item.listHigh, 0) / data.length;
        this.setElement('sumAvgListHigh', avgListHigh.toFixed(2));

        const avgListLow = data.reduce((sum, item) => sum + item.listLow, 0) / data.length;
        this.setElement('sumAvgListLow', avgListLow.toFixed(2));

        const avgListGain = data.reduce((sum, item) => {
            const gain = ((item.listHigh - item.avgBid) / item.avgBid * 100);
            return sum + gain;
        }, 0) / data.length;
        this.setElement('sumAvgListGain', avgListGain.toFixed(2) + '%');
    },

    setElement(id, value) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    }
};

// ========== Excel 匯出 ==========
const ExcelExport = {
    // 匯出到 Excel
    export() {
        try {
            const data = AppState.filteredData;
            if (data.length === 0) {
                alert('目前沒有資料可匯出');
                return;
            }

            // 準備 CSV 資料
            const headers = [
                '序號', '開標日期', '股票代號', 'CB代號', '名稱', '股本(億)',
                '發行規模', '年期', '擔保', '信評', '競拍張數', '底標價',
                '截標日', '截標收盤價', '轉換價', '訂價溢價率', '理論價',
                '最低得標', '最低溢價', '最高得標', '最高溢價',
                '平均得標', '平均溢價', '掛牌後最高價', '掛牌後最低價'
            ];

            let csvContent = '\uFEFF'; // UTF-8 BOM
            csvContent += headers.join(',') + '\n';

            data.forEach(item => {
                const row = [
                    item.no,
                    item.date,
                    item.stockCode,
                    item.cbCode,
                    item.name,
                    item.capital,
                    item.scale,
                    item.period,
                    item.secured === 'Yes' ? '有' : '無',
                    item.rating,
                    item.volume,
                    item.floor.toFixed(1),
                    item.cutoffDate,
                    item.cutoffPrice.toFixed(2),
                    item.convPrice.toFixed(2),
                    item.pricePremium,
                    item.theoretical.toFixed(2),
                    item.minBid.toFixed(2),
                    item.minPremium.toFixed(1) + '%',
                    item.maxBid.toFixed(2),
                    item.maxPremium.toFixed(1) + '%',
                    item.avgBid.toFixed(2),
                    item.avgPremium.toFixed(1) + '%',
                    item.listHigh.toFixed(2),
                    item.listLow.toFixed(2)
                ];
                csvContent += row.join(',') + '\n';
            });

            // 創建下載連結
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            const timestamp = new Date().toISOString().slice(0, 10);
            link.setAttribute('href', url);
            link.setAttribute('download', `可轉債競拍資料_${timestamp}.csv`);
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert(`成功匯出 ${data.length} 筆資料！`);
        } catch (error) {
            console.error('匯出失敗:', error);
            alert('匯出失敗，請稍後再試');
        }
    }
};

// ========== 全域函數（供 HTML 呼叫）==========
function searchData() {
    DataFilter.filter();
}

function resetSearch() {
    DataFilter.reset();
}

function exportToExcel() {
    ExcelExport.export();
}

function setQuickPeriod() {
    DateModule.setQuickPeriod();
}

// ========== 初始化 ==========
function init() {
    try {
        AppState.auctionData = [...AUCTION_DATA];
        AppState.filteredData = [...AUCTION_DATA];

        DateModule.displayCurrentDate();
        ViewCounter.initialize();
        DataDisplay.render(AppState.filteredData);
        StatsModule.update(AppState.filteredData);
        SummaryModule.update(AppState.filteredData);
        SortModule.initialize();

        console.log('可轉債競拍查詢系統已初始化');
    } catch (error) {
        console.error('初始化失敗:', error);
    }
}

// 頁面載入時初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
