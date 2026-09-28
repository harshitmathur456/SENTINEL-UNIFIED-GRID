/**
 * Route Replay Controller
 * Handles waypoint-by-waypoint replay with scrubber, speeds, and map camera tracking
 */

export class RouteReplayController {
  constructor(onStepCallback) {
    this.onStepCallback = onStepCallback;
    this.vehicle = null;
    this.detections = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.speedMultiplier = 1;
    this.timer = null;

    this.container = document.getElementById('route-replay-bar');
    this.slider = document.getElementById('replay-slider');
    this.btnPlay = document.getElementById('btn-replay-play');
    this.btnPrev = document.getElementById('btn-replay-prev');
    this.btnNext = document.getElementById('btn-replay-next');
    this.btnSpeed = document.getElementById('btn-replay-speed');
    this.plateLabel = document.getElementById('replay-plate-label');
    this.statusText = document.getElementById('replay-status-text');
    this.timeLabel = document.getElementById('replay-timestamp-label');

    this.initEventListeners();
  }

  initEventListeners() {
    if (this.btnPlay) {
      this.btnPlay.addEventListener('click', () => this.togglePlay());
    }

    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => {
        this.pause();
        this.stepTo(this.currentIndex - 1);
      });
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => {
        this.pause();
        this.stepTo(this.currentIndex + 1);
      });
    }

    if (this.btnSpeed) {
      this.btnSpeed.addEventListener('click', () => this.cycleSpeed());
    }

    if (this.slider) {
      this.slider.addEventListener('input', (e) => {
        this.pause();
        this.stepTo(parseInt(e.target.value, 10));
      });
    }
  }

  loadRoute(vehicle) {
    this.pause();
    this.vehicle = vehicle;
    this.detections = (vehicle && vehicle.detections) || [];
    this.currentIndex = 0;

    if (this.detections.length === 0) {
      this.hide();
      return;
    }

    if (this.plateLabel) {
      this.plateLabel.textContent = vehicle.plate_number;
    }

    if (this.slider) {
      this.slider.min = 0;
      this.slider.max = this.detections.length - 1;
      this.slider.value = 0;
    }

    this.show();
    this.stepTo(0);
  }

  show() {
    if (this.container) {
      this.container.style.display = 'flex';
    }
  }

  hide() {
    this.pause();
    if (this.container) {
      this.container.style.display = 'none';
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (!this.detections || this.detections.length === 0) return;

    if (this.currentIndex >= this.detections.length - 1) {
      this.currentIndex = 0;
    }

    this.isPlaying = true;
    if (this.btnPlay) {
      this.btnPlay.innerHTML = '<i class="fas fa-pause"></i>';
      this.btnPlay.title = "Pause Replay";
    }

    // Update trigger button in sidebar if present
    const btnTrigger = document.getElementById('btn-replay-trigger');
    if (btnTrigger) {
      btnTrigger.innerHTML = `<i class="fas fa-pause-circle"></i> Pause Replay (Hop ${this.currentIndex + 1}/${this.detections.length})`;
      btnTrigger.classList.add('playing');
    }

    // Immediately execute current step
    this.stepTo(this.currentIndex);
    this.scheduleNextStep();
  }

  pause() {
    this.isPlaying = false;
    clearTimeout(this.timer);
    if (this.btnPlay) {
      this.btnPlay.innerHTML = '<i class="fas fa-play"></i>';
      this.btnPlay.title = "Play Replay";
    }

    const btnTrigger = document.getElementById('btn-replay-trigger');
    if (btnTrigger && this.detections) {
      btnTrigger.innerHTML = `<i class="fas fa-play-circle"></i> Resume Replay (Hop ${this.currentIndex + 1}/${this.detections.length})`;
      btnTrigger.classList.remove('playing');
    }
  }

  cycleSpeed() {
    if (this.speedMultiplier === 1) {
      this.speedMultiplier = 2;
    } else if (this.speedMultiplier === 2) {
      this.speedMultiplier = 4;
    } else {
      this.speedMultiplier = 1;
    }

    if (this.btnSpeed) {
      this.btnSpeed.textContent = `${this.speedMultiplier}x`;
    }

    if (this.isPlaying) {
      clearTimeout(this.timer);
      this.scheduleNextStep();
    }
  }

  scheduleNextStep() {
    if (!this.isPlaying) return;

    const baseDelayMs = 2000;
    const interval = baseDelayMs / this.speedMultiplier;

    this.timer = setTimeout(() => {
      if (this.currentIndex < this.detections.length - 1) {
        this.stepTo(this.currentIndex + 1);
        this.scheduleNextStep();
      } else {
        // Replay completed
        this.isPlaying = false;
        clearTimeout(this.timer);
        if (this.btnPlay) {
          this.btnPlay.innerHTML = '<i class="fas fa-rotate-right"></i>';
          this.btnPlay.title = "Replay Route Again";
        }
        if (this.statusText) {
          this.statusText.innerHTML = `<i class="fas fa-circle-check" style="color:var(--accent-emerald);"></i> Corridor Replay Complete &bull; All ${this.detections.length} Hops Traced`;
        }
        const btnTrigger = document.getElementById('btn-replay-trigger');
        if (btnTrigger) {
          btnTrigger.innerHTML = `<i class="fas fa-rotate-right"></i> Replay Route (${this.detections.length} Hops)`;
          btnTrigger.classList.remove('playing');
        }

        // Notify that replay completed so map can display full overview
        if (typeof this.onStepCallback === 'function') {
          this.onStepCallback(null, this.currentIndex, this.detections, this.vehicle, true);
        }
      }
    }, interval);
  }

  stepTo(index) {
    if (index < 0 || index >= this.detections.length) return;
    this.currentIndex = index;

    const currentDet = this.detections[this.currentIndex];

    if (this.slider) {
      this.slider.value = this.currentIndex;
    }

    if (this.statusText) {
      this.statusText.innerHTML = `<i class="fas fa-satellite-dish" style="color:var(--accent-cyan); animation:pulseBeacon 1.5s infinite;"></i> Hop ${this.currentIndex + 1} of ${this.detections.length}: ${currentDet.location_name}`;
    }

    if (this.timeLabel) {
      this.timeLabel.textContent = currentDet.timestamp_utc.replace(' UTC', '');
    }

    const btnTrigger = document.getElementById('btn-replay-trigger');
    if (btnTrigger && this.isPlaying) {
      btnTrigger.innerHTML = `<i class="fas fa-satellite fa-spin"></i> Replaying Hop ${this.currentIndex + 1}/${this.detections.length}...`;
    }

    if (typeof this.onStepCallback === 'function') {
      this.onStepCallback(currentDet, this.currentIndex, this.detections, this.vehicle, false);
    }
  }
}
