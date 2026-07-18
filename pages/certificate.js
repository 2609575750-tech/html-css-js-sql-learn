/* ============================================================
   certificate.js — 学习证书（全部通关解锁，canvas 生成 PNG）
   ============================================================ */
(function (global) {
  'use strict';
  global.FYViews = global.FYViews || {};
  global.FYViews.certificate = function (param, container) {
    var all = FYCourse.flat();
    var total = all.length;
    var records = FYStorage.getQuizRecords();
    var done = 0; var remaining = [];
    all.forEach(function (it) {
      if (records[it.lesson.id] && records[it.lesson.id].doneAt) done++;
      else remaining.push(it);
    });

    var html = '<div class="main-wrap fade-up">';
    html += '<h1 style="font-size:24px;margin-bottom:4px">我的学习证书 🎓</h1>';

    if (done < total) {
      html += '<p class="text-2" style="margin-bottom:18px">还差 ' + (total - done) + ' 章测验就能解锁完整证书啦！</p>';
      html += '<div class="section-block" style="padding:16px 18px">' +
        '<div class="flex items-center gap-3 flex-wrap">' +
          '<div class="fy-progress" style="flex:1;min-width:200px"><span style="width:' + Math.round(done / total * 100) + '%"></span></div>' +
          '<div class="font-bold text-fy-primary">' + done + ' / ' + total + '</div>' +
        '</div>' +
        '<p class="text-2" style="margin-top:12px"><i class="fa-solid fa-lock"></i> 待完成：' +
          remaining.map(function (it) { return it.lesson.title; }).join('、') + '</p>' +
      '</div>';
      html += '<div style="margin-top:18px"><a class="fy-btn fy-btn-primary" href="#/quiz"><i class="fa-solid fa-clipboard-check"></i> 去完成测验</a></div>';
      html += '</div>';
      container.innerHTML = html;
      return;
    }

    var savedName = FYStorage.getCertName();
    html += '<p class="text-2" style="margin-bottom:16px">恭喜全部通关！填上你的名字，生成专属证书并下载收藏吧～</p>';
    html += '<div class="section-block" style="padding:18px 20px">' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:14px">' +
        '<input id="cert-name" placeholder="输入你的姓名/昵称" value="' + FYUtil.escapeHtml(savedName) + '" ' +
          'style="flex:1;min-width:200px;padding:10px 14px;border:1px solid var(--fy-border);border-radius:10px;background:var(--fy-surface-2);color:var(--fy-text);outline:none;font-size:15px" />' +
        '<button class="fy-btn fy-btn-primary" id="cert-gen"><i class="fa-solid fa-wand-magic-sparkles"></i> 生成证书</button>' +
        '<a class="fy-btn fy-btn-ghost hidden" id="cert-dl" download="frontend-certificate.png"><i class="fa-solid fa-download"></i> 下载 PNG</a>' +
      '</div>' +
      '<div id="cert-preview"></div>' +
    '</div>';
    html += '</div>';
    container.innerHTML = html;

    var nameInput = container.querySelector('#cert-name');
    var genBtn = container.querySelector('#cert-gen');
    var dlBtn = container.querySelector('#cert-dl');
    var preview = container.querySelector('#cert-preview');

    function generate() {
      var name = (nameInput.value || '').trim() || '前端学习者';
      FYStorage.setCertName(name);
      var url = drawCertificate(name, total);
      preview.innerHTML = '<img src="' + url + '" alt="证书" style="max-width:100%;border-radius:12px;box-shadow:var(--fy-shadow)" />';
      dlBtn.href = url;
      dlBtn.classList.remove('hidden');
    }
    genBtn.addEventListener('click', generate);
    nameInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') generate(); });
    if (savedName) generate();

    function drawCertificate(name, totalN) {
      var c = document.createElement('canvas');
      c.width = 840; c.height = 580;
      var ctx = c.getContext('2d');

      var g = ctx.createLinearGradient(0, 0, 840, 580);
      g.addColorStop(0, '#EAF1FF'); g.addColorStop(1, '#FFFFFF');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 840, 580);

      ctx.strokeStyle = '#3D7EFF'; ctx.lineWidth = 6;
      ctx.strokeRect(18, 18, 804, 544);
      ctx.strokeStyle = '#7AA7FF'; ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, 780, 520);

      ctx.textAlign = 'center'; ctx.fillStyle = '#1E2735';
      ctx.font = 'bold 38px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('前端自学通关证书', 420, 110);
      ctx.fillStyle = '#5C6880'; ctx.font = '16px Arial';
      ctx.fillText('CERTIFICATE OF COMPLETION', 420, 140);

      ctx.strokeStyle = '#3D7EFF'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(300, 158); ctx.lineTo(540, 158); ctx.stroke();

      ctx.fillStyle = '#5C6880'; ctx.font = '18px "PingFang SC",sans-serif';
      ctx.fillText('兹证明', 420, 215);

      ctx.fillStyle = '#3D7EFF'; ctx.font = 'bold 40px "PingFang SC",sans-serif';
      ctx.fillText(name, 420, 270);

      ctx.fillStyle = '#1E2735'; ctx.font = '17px "PingFang SC",sans-serif';
      ctx.fillText('已完成《前端自学站》HTML / CSS / JavaScript / SQL', 420, 320);
      ctx.fillText('全部 ' + totalN + ' 个章节的学习并通过各章测验。', 420, 348);

      var d = new Date();
      var dateStr = d.getFullYear() + ' 年 ' + (d.getMonth() + 1) + ' 月 ' + d.getDate() + ' 日';
      ctx.fillStyle = '#5C6880'; ctx.font = '15px "PingFang SC",sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('颁发日期：' + dateStr, 70, 470);

      ctx.textAlign = 'center';
      ctx.beginPath(); ctx.arc(720, 455, 52, 0, Math.PI * 2);
      ctx.strokeStyle = '#F55353'; ctx.lineWidth = 4; ctx.stroke();
      ctx.fillStyle = '#F55353'; ctx.font = 'bold 22px "PingFang SC",sans-serif';
      ctx.fillText('通关', 720, 449);
      ctx.font = '12px "PingFang SC",sans-serif';
      ctx.fillText('前端 · 自学站', 720, 472);

      return c.toDataURL('image/png');
    }
  };
})(window);
